import os
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def create_resume(output_path):
    # Set margin to 40pt for a clean layout
    doc = SimpleDocTemplate(
        output_path, 
        pagesize=letter,
        rightMargin=40, 
        leftMargin=40,
        topMargin=40, 
        bottomMargin=40
    )
    story = []
    styles = getSampleStyleSheet()
    
    # Color scheme
    primary_color = colors.HexColor("#1e293b")  # Dark Slate
    accent_color = colors.HexColor("#0f766e")   # Teal Accent
    text_color = colors.HexColor("#334155")     # Slate Gray
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=1, # Centered
        spaceAfter=4
    )
    
    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_color,
        alignment=1, # Centered
        spaceAfter=12
    )
    
    section_title_style = ParagraphStyle(
        'SectionTitle',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=accent_color,
        spaceBefore=8,
        spaceAfter=3,
        keepWithNext=True
    )
    
    job_title_style = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11.5,
        textColor=primary_color,
        spaceBefore=3,
        spaceAfter=1,
        keepWithNext=True
    )
    
    job_details_style = ParagraphStyle(
        'JobDetails',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=10.5,
        textColor=colors.HexColor("#64748b"),
        spaceAfter=3,
        keepWithNext=True
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_color,
        spaceAfter=2
    )
    
    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=text_color,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=2
    )

    # Header
    story.append(Paragraph("KARUPAKALA RAHUL CHANDRA", title_style))
    contact_text = (
        "Hyderabad, India  |  +91 9502568861  |  "
        "<a href='mailto:rahulchandrakarupakala@gmail.com' color='#0f766e'>rahulchandrakarupakala@gmail.com</a><br/>"
        "<a href='https://linkedin.com/in/rahul-chandra-karupakala-318a5b326' color='#0f766e'>linkedin.com/in/rahul-chandra-karupakala-318a5b326</a>  |  "
        "<a href='https://github.com/k-rahul-chandra' color='#0f766e'>github.com/k-rahul-chandra</a>"
    )
    story.append(Paragraph(contact_text, contact_style))
    
    def add_separator():
        line_data = [['']]
        line_table = Table(line_data, colWidths=[532], rowHeights=[0.5])
        line_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#cbd5e1")),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(line_table)
        story.append(Spacer(1, 3))
        
    # Education
    story.append(Paragraph("EDUCATION", section_title_style))
    add_separator()
    
    edu_text = (
        "<b>Malla Reddy University</b>, Hyderabad, India<br/>"
        "B.Tech in Artificial Intelligence & Machine Learning (AIML) <i>(Expected 2027)</i><br/>"
        "CGPA: 7.5 / 10"
    )
    story.append(Paragraph(edu_text, body_style))
    story.append(Spacer(1, 4))
    
    # Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_title_style))
    add_separator()
    
    skills_data = [
        [Paragraph("<b>Languages:</b>", body_style), Paragraph("Python (Intermediate to Advanced), Java, JavaScript, SQL", body_style)],
        [Paragraph("<b>AI / Machine Learning:</b>", body_style), Paragraph("Scikit-Learn, Unsupervised Clustering, Predictive Modeling, Pandas, NumPy", body_style)],
        [Paragraph("<b>GenAI & Agents:</b>", body_style), Paragraph("LangChain, LLMs (OpenAI API / Ollama), CrewAI / AutoGen, Prompt Engineering", body_style)],
        [Paragraph("<b>Databases & Vectors:</b>", body_style), Paragraph("MySQL, ChromaDB / Pinecone (Vector Databases)", body_style)],
        [Paragraph("<b>Tools & Web Dev:</b>", body_style), Paragraph("Git, GitHub, Streamlit, Node.js, React.js, HTML5, CSS3", body_style)]
    ]
    skills_table = Table(skills_data, colWidths=[110, 422])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 4))
    
    # Projects
    story.append(Paragraph("TECHNICAL PROJECTS", section_title_style))
    add_separator()
    
    # Project 1
    story.append(Paragraph("J.A.R.V.I.S. – Context-Aware Voice AI Agent (Solo Project)", job_title_style))
    story.append(Paragraph("Python, LangChain, OpenAI/Ollama, Whisper API, PyAutoGUI", job_details_style))
    story.append(Paragraph("&bull; Designing and engineering an autonomous local AI assistant utilizing Large Language Models (LLMs) and Advanced Function Calling to manage system-level operations.", bullet_style))
    story.append(Paragraph("&bull; Implementing a real-time Speech-to-Text and Text-to-Speech pipeline using Whisper API for ultra-low latency voice interaction.", bullet_style))
    story.append(Paragraph("&bull; Integrating automation scripts to control system applications, manage background calendars, and dynamically trigger text dispatches via messaging APIs based on raw voice intent.", bullet_style))
    story.append(Spacer(1, 4))
    
    # Project 2
    story.append(Paragraph("Enterprise Bank Customer Segmentation System (Academic Collaboration)", job_title_style))
    story.append(Paragraph("Python, Scikit-Learn, Pandas, NumPy, Streamlit, Git", job_details_style))
    story.append(Paragraph("&bull; Developed an end-to-end unsupervised machine learning pipeline to extract actionable consumer profiles from a massive financial dataset containing 1M+ transactions across 800K Indian consumers.", bullet_style))
    story.append(Paragraph("&bull; Applied RFM (Recency, Frequency, Monetary) scaling and optimized K-Means clustering using the Elbow Method to target highly accurate demographic clusters.", bullet_style))
    story.append(Paragraph("&bull; Handled comprehensive data preprocessing, missing value imputation, and feature scaling to overcome hardware memory constraints during large-scale computational execution.", bullet_style))
    story.append(Paragraph("&bull; Built and deployed an interactive executive visualization dashboard via Streamlit to visually isolate cluster properties and customer behaviors.", bullet_style))
    story.append(Spacer(1, 4))
    
    # Project 3
    story.append(Paragraph("Multi-Agent Collaborative AI Research Assistant (Solo Project)", job_title_style))
    story.append(Paragraph("Python, CrewAI, LangChain, ChromaDB, Hugging Face", job_details_style))
    story.append(Paragraph("&bull; Engineered a local multi-agent network where independent AI personas collaborate autonomously to conduct deep academic research and complex code debugging tasks.", bullet_style))
    story.append(Paragraph("&bull; Programmed a multi-layered workflow consisting of a Research Agent to parse documentation, a Developer Agent to write optimized code, and a Reviewer Agent to stress-test scripts.", bullet_style))
    story.append(Paragraph("&bull; Integrated ChromaDB as an embedded local vector database to empower agents with native semantic search capabilities over dynamic local repositories.", bullet_style))
    story.append(Spacer(1, 4))
    
    # Leadership & Collaboration
    story.append(Paragraph("LEADERSHIP & COLLABORATION", section_title_style))
    add_separator()
    
    story.append(Paragraph("Project Team Lead &ndash; Malla Reddy University", job_title_style))
    story.append(Paragraph("Academic Project Delivery & Version Control", job_details_style))
    story.append(Paragraph("&bull; Directed a 3-member peer team during iterative software build cycles, establishing precise project timelines and delegating tasks mapping directly to individual core developer skill sets.", bullet_style))
    story.append(Paragraph("&bull; Facilitated clear version control habits by establishing structured GitHub rules, minimizing deployment code conflicts, and overseeing smooth merge pipelines.", bullet_style))
    
    doc.build(story)

if __name__ == "__main__":
    create_resume("resume.pdf")
    print("Resume PDF successfully generated!")
