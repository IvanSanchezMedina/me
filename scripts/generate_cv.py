"""Generate the portfolio CV. Requires reportlab; run from any directory."""

from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether, HRFlowable,
)

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'output/pdf/Ivan_Sanchez_Medina_CV.pdf'
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

# Embedded fonts preserve Spanish accents and selectable text.
font_dir = Path('/System/Library/Fonts/Supplemental')
if (font_dir / 'Arial.ttf').exists():
    pdfmetrics.registerFont(TTFont('CV', str(font_dir / 'Arial.ttf')))
    pdfmetrics.registerFont(TTFont('CV-Bold', str(font_dir / 'Arial Bold.ttf')))
    pdfmetrics.registerFontFamily('CV', normal='CV', bold='CV-Bold')
    FONT, BOLD = 'CV', 'CV-Bold'
else:
    FONT, BOLD = 'Helvetica', 'Helvetica-Bold'

INK = colors.HexColor('#182638')
MUTED = colors.HexColor('#465568')
ACCENT = colors.HexColor('#305882')
styles = {
    'name': ParagraphStyle('name', fontName=BOLD, fontSize=24, leading=28, textColor=INK, spaceAfter=5),
    'subtitle': ParagraphStyle('subtitle', fontName=BOLD, fontSize=12, leading=16, textColor=ACCENT, spaceAfter=7),
    'contact': ParagraphStyle('contact', fontName=FONT, fontSize=9, leading=13, textColor=MUTED),
    'section': ParagraphStyle('section', fontName=BOLD, fontSize=11, leading=15, textColor=ACCENT, spaceBefore=10, spaceAfter=6, keepWithNext=True),
    'body': ParagraphStyle('body', fontName=FONT, fontSize=9.5, leading=13, textColor=INK, spaceAfter=5),
    'job': ParagraphStyle('job', fontName=BOLD, fontSize=10.5, leading=14, textColor=INK, spaceAfter=2, keepWithNext=True),
    'meta': ParagraphStyle('meta', fontName=FONT, fontSize=9, leading=12, textColor=MUTED, spaceAfter=4, keepWithNext=True),
    'bullet': ParagraphStyle('bullet', fontName=FONT, fontSize=9.5, leading=12.5, textColor=INK, leftIndent=10, firstLineIndent=-8, spaceAfter=2),
    'skill': ParagraphStyle('skill', fontName=FONT, fontSize=9.5, leading=13, textColor=INK, spaceAfter=6),
}

story = []
def p(text, style='body'):
    return Paragraph(text, styles[style])

def section(title):
    story.append(p(title.upper(), 'section'))

def link(url, label):
    return f'<link href="{url}" color="#305882">{label}</link>'

def job(title, company, dates, bullets, location=None):
    meta = dates + (f' | {location}' if location else '')
    block = [p(f'{title} | {company}', 'job'), p(meta, 'meta')]
    block.extend(p(f'- {text}', 'bullet') for text in bullets)
    block.append(Spacer(1, 7))
    story.append(KeepTogether(block))

story += [
    p('Iván Sánchez Medina', 'name'),
    p('Full Stack Developer | PHP y Laravel', 'subtitle'),
    p('Guadalajara, Jalisco, México | Teléfono / WhatsApp: +52 922 120 4331', 'contact'),
    p(link('mailto:ivanusanchezm@gmail.com', 'ivanusanchezm@gmail.com'), 'contact'),
    p('LinkedIn: ' + link('https://www.linkedin.com/in/ivansanchezmedina/', 'linkedin.com/in/ivansanchezmedina'), 'contact'),
    p('GitHub: ' + link('https://github.com/IvanSanchezMedina', 'github.com/IvanSanchezMedina') +
      ' | Portafolio: ' + link('https://ivansanchezmedina.github.io/Portfolio/', 'ivansanchezmedina.github.io/Portfolio'), 'contact'),
    Spacer(1, 10),
    HRFlowable(width='100%', thickness=1, color=ACCENT),
]

section('Perfil profesional')
story.append(p('Desarrollo web desde 2019, con especialización en PHP y Laravel. Experiencia en '
               'integración de sistemas, infraestructura y operación de TI; liderazgo técnico, '
               'coordinación de equipos y automatización de procesos. Uso de IA como apoyo al desarrollo de software.'))

section('Experiencia laboral')
job('Desarrollador principal', 'Akaya Media', 'May. 2024 - Actualidad', [
    'Desarrollo web y de APIs. Reconstrucción de Laravel 6 a Laravel 12 con un rediseño completo en colaboración con diseñadores mediante Figma.',
    'Integración de PayPal, Stripe y Piano.io; automatización de procesos y administración de Google Cloud, Google Console, servidores y ambientes de pruebas y staging.',
    'Supervisión de un desarrollador y participación en entrevistas. Coordinación con Trello, ClickUp y Discord; uso previo de Azure.',
], 'Remoto')
job('Software Engineer PHP', 'Codebay', 'Nov. 2022 - May. 2024', [
    'Software a medida y nuevos módulos con distintas versiones de Laravel; React en algunos proyectos.',
    'Integración de APIs REST y SOAP, servicios de terceros y pasarelas de pago. Trabajo con Azure, Scrum y Slack.',
], 'Remoto')
job('Analista Programador / Responsable de TI', 'alaya', 'Ago. 2021 - Nov. 2022', [
    'Implementación de Salesforce como Product Owner con un equipo de Argentina y configuración de soluciones a medida.',
    'Gestión de TI y dispositivos, desarrollo e instrucción en tecnología, seguridad y herramientas. Coordinación de la renovación web con desarrolladores externos.',
], 'Híbrido | Guadalajara')
job('Desarrollador web', 'Sitio Random Marketing Digital', 'Ago. 2020 - Ago. 2021', [
    'Desarrollo Laravel e integración con Mercado Libre, Liverpool, Walmart, Claro Shop, Sears y Shopify; supervisión de desarrolladores y atención directa a clientes.',
    'Implementación de diseños, renovación y mantenimiento de WordPress y administración de hosting y servidores. Scrum, Slack y Asana.',
], 'Presencial')
job('Desarrollador / Soporte técnico', 'Importserv Internationals', 'Ago. 2019 - Jun. 2020', [
    'Sistemas de inventario en PHP y puntos de venta de escritorio en Pascal con Lazarus.',
    'Mantenimiento de equipos, reparación de impresoras e inventarios en tiendas de distintos estados; soporte a DS Factura.',
], 'Presencial')

story.append(PageBreak())
story += [p('Iván Sánchez Medina', 'subtitle'), p('Colaboraciones, proyectos y competencias', 'contact')]
section('Colaboración externa | Independiente del empleo')
job('Desarrollador externo', 'Kinali Works', 'Colaboración por proyecto', [
    'Renovación del sitio del estudio y desarrollo del sitio oficial del videojuego Alma Stone con Next.js y Vite. Implementación individual en coordinación con el equipo de Kinali para gestionar los cambios.',
    'Migración de ambos proyectos a nuevos servidores.',
])
section('Proyectos destacados')

def project(name, tech, url, description):
    story.append(KeepTogether([
        p(f'{name} | {tech}', 'job'),
        p(link(url, url.replace('https://', '').rstrip('/')), 'meta'),
        p(description), Spacer(1, 4),
    ]))

project('Akaya', 'Laravel 12', 'https://akaya.io/',
        'Reconstrucción de la plataforma de webcómics: nueva interfaz, optimización del sistema, APIs, pagos e infraestructura. Desarrollo principal con un desarrollador a cargo.')
project('Alma Stone', 'Vite', 'https://almastonegame.com/',
        'Sitio oficial creado desde cero para presentar un videojuego en desarrollo. Colaboración externa con el equipo de Kinali.')
project('Kinali Works', 'Next.js', 'https://kinaliworks.com/',
        'Migración de WordPress a Next.js y renovación visual del sitio del estudio, conservando su identidad. Colaboración externa.')
project('GOCO', 'Laravel', 'https://goco.mx/',
        'Desarrollo individual desde cero de una plataforma que conecta canales de e-commerce y centraliza ventas, productos, inventarios y almacenes.')

section('Competencias técnicas')
for category, skills in [
    ('Backend e integraciones', 'PHP, Laravel, Node.js, Express, REST, SOAP, PayPal, Stripe, Piano.io.'),
    ('Frontend', 'JavaScript, React, Next.js, Vite, HTML, CSS, Tailwind CSS, Bootstrap, jQuery, Sass.'),
    ('Datos e infraestructura', 'MySQL, SQL, MongoDB, Google Cloud, Azure, AWS, Linux, cPanel, servidores, ambientes de pruebas y staging.'),
    ('Plataformas y herramientas', 'Salesforce, WordPress, Pascal, Lazarus, Git, GitHub, GitLab, Figma.'),
    ('Desarrollo asistido por IA', 'Codex, Claude y otras herramientas de inteligencia artificial orientadas al desarrollo de software.'),
    ('Colaboración', 'Scrum, Trello, ClickUp, Asana, Jira, Slack y Discord. Liderazgo técnico, Product Ownership y capacitación.'),
]:
    story.append(p(f'<b>{category}:</b> {skills}', 'skill'))

section('Formación académica')
story += [p('Ingeniería en Sistemas Computacionales', 'job'),
          p('Instituto Tecnológico de Minatitlán | 2014 - 2019', 'body')]

def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor('#D6DDE5'))
    canvas.line(44, 37, letter[0] - 44, 37)
    canvas.setFont(FONT, 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(44, 24, 'Iván Sánchez Medina | Full Stack Developer')
    canvas.drawRightString(letter[0] - 44, 24, f'{doc.page}')
    canvas.restoreState()

doc = SimpleDocTemplate(str(OUTPUT), pagesize=letter, rightMargin=44, leftMargin=44,
                        topMargin=36, bottomMargin=48, title='CV - Iván Sánchez Medina - Full Stack Developer',
                        author='Iván Sánchez Medina', subject='Experiencia, proyectos y habilidades profesionales')
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(OUTPUT)
