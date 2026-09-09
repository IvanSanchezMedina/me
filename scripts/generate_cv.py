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
    'section': ParagraphStyle('section', fontName=BOLD, fontSize=11, leading=15, textColor=ACCENT, spaceBefore=12, spaceAfter=6, keepWithNext=True),
    'body': ParagraphStyle('body', fontName=FONT, fontSize=10, leading=14, textColor=INK, spaceAfter=5),
    'job': ParagraphStyle('job', fontName=BOLD, fontSize=10.5, leading=14, textColor=INK, spaceAfter=2, keepWithNext=True),
    'meta': ParagraphStyle('meta', fontName=FONT, fontSize=9, leading=12, textColor=MUTED, spaceAfter=4, keepWithNext=True),
    'bullet': ParagraphStyle('bullet', fontName=FONT, fontSize=10, leading=13.5, textColor=INK, leftIndent=10, firstLineIndent=-8, spaceAfter=2),
    'skill': ParagraphStyle('skill', fontName=FONT, fontSize=10, leading=14, textColor=INK, spaceAfter=6),
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
story.append(p('Desarrollador Full Stack con trayectoria desde 2019, especializado en PHP y Laravel. '
               'Experiencia en aplicaciones web, APIs, servidores y sistemas empresariales. '
               'Responsable del desarrollo y la operación de TI en Akaya Media, con experiencia '
               'en reconstrucción de plataformas, automatización de procesos y supervisión de una persona.'))

section('Experiencia laboral')
job('Full Stack Developer', 'Akaya Media', 'May. 2024 - Actualidad', [
    'Responsable del desarrollo web, administración de APIs, gestión de servidores y mantenimiento del área de TI.',
    'Reconstrucción de la plataforma desde cero con Laravel; optimización del sistema, actualización de APIs y servidores, mejora de la interfaz y automatización de procesos.',
    'Desarrollo de la nueva versión con una persona a mi cargo.',
], 'Remoto | Monterrey, Nuevo León')
job('Software Engineer PHP', 'Codebay', 'Nov. 2022 - May. 2024', [
    'Implementación de módulos en Laravel y desarrollo de sistemas web según las necesidades del cliente.',
    'Integración de APIs REST, SOAP y servicios externos; actualización y mantenimiento de sistemas.',
])
job('Analista Programador', 'alaya | agente de fianzas y seguros', 'Ago. 2021 - Nov. 2022', [
    'Gestión del área de TI, integración y administración de Salesforce y administración de sistemas.',
    'Soporte técnico y participación como instructor y Product Owner.',
], 'Guadalajara, Jalisco')
job('Desarrollador web', 'Sitio Random Marketing Digital', 'Ago. 2020 - Ago. 2021', [
    'Desarrollo web con Laravel y actualización de sitios en WordPress según las necesidades del cliente.',
    'Administración de hosting y gestión del área de TI.',
], 'México')
job('Desarrollador web', 'Importserv Internationals', 'Ago. 2019 - Jun. 2020', [
    'Desarrollo de aplicaciones web y modificación y actualización de puntos de venta.',
    'Mantenimiento de equipos de cómputo y gestión de inventario en tiendas.',
], 'México')

story.append(PageBreak())
story += [p('Iván Sánchez Medina', 'subtitle'), p('Full Stack Developer | Proyectos y competencias', 'contact')]
section('Proyectos destacados')

def project(name, tech, url, role, description):
    story.append(KeepTogether([
        p(f'{name} | {tech}', 'job'),
        p(role + ' | ' + link(url, url.replace('https://', '').rstrip('/')), 'meta'),
        p(description), Spacer(1, 9),
    ]))

project('Akaya', 'Laravel', 'https://akaya.io/',
        'Responsable del desarrollo; una persona a mi cargo',
        'Reconstruí desde cero la plataforma de webcómics en una versión completamente nueva. '
        'Optimicé el sistema, actualicé las APIs y los servidores, mejoré la interfaz de usuario '
        'y automaticé procesos.')
project('Alma Stone', 'Vite', 'https://almastonegame.com/',
        'Desarrollo individual',
        'Creé desde cero el sitio oficial para un videojuego aún en desarrollo. '
        'Me encargué de toda la implementación web para presentar el proyecto.')
project('Kinali Works', 'Next.js', 'https://kinaliworks.com/',
        'Desarrollo individual',
        'Reconstruí el sitio del estudio de videojuegos y lo migré de WordPress a Next.js. '
        'Modernicé la interfaz y los elementos visuales manteniendo la esencia y la identidad originales.')
project('GOCO', 'Laravel', 'https://goco.mx/',
        'Desarrollo individual',
        'Desarrollé desde cero una plataforma para conectar canales de e-commerce y centralizar '
        'la gestión de ventas. Implementé el control de almacenes, inventarios y productos en un solo lugar.')

section('Habilidades técnicas')
for category, skills in [
    ('Backend y APIs', 'PHP, Laravel, Node.js, Express.js, APIs REST, SOAP.'),
    ('Frontend', 'JavaScript, React, Next.js, Vite, HTML5, CSS3, Tailwind CSS, Bootstrap, jQuery, Sass.'),
    ('Bases de datos', 'MySQL, SQL, MongoDB.'),
    ('Infraestructura y control de versiones', 'Gestión de servidores, Linux, cPanel, AWS, Azure, Git, GitHub, GitLab.'),
    ('Plataformas y trabajo en equipo', 'WordPress, Salesforce, Jetstream, Inertia, Scrum, Jira.'),
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
