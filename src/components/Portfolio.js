import { useState, useEffect } from 'react';
import { Menu, Moon, Sun, ExternalLink, ChevronRight, Phone, Mail, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Portfolio = () => {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isVisible, setIsVisible] = useState({});
  const [touchDevice, setTouchDevice] = useState(false);

  // Detect touch device on mount
  useEffect(() => {
    setTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2, 
        rootMargin: '0px 0px -50% 0px',
      }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('aside') && !event.target.closest('button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Added functionality to close menu when clicking a link on mobile
  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-800 text-white md:hidden z-50"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-16 p-2 rounded-full bg-gray-800 text-white z-50"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out z-40 
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-y-auto`}
      >
        <div className="h-full flex flex-col justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400 mb-2">Arup Jyoti Hui</h1>
            <h2 className="text-gray-400 mb-8">DevOps Engineer</h2>
            <nav>
              <ul className="space-y-4">
                {['about', 'experience', 'projects', 'skills', 'education', 'certifications', 'contact'].map((section) => (
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      className={`group flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors ${
                        activeSection === section ? 'text-emerald-400' : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(section);
                      }}
                    >
                      <ChevronRight
                        size={16}
                        className={`transform transition-transform duration-300 ${
                          activeSection === section ? 'rotate-90' : ''
                        }`}
                      />
                      <span className="capitalize">{section}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div>
            <div className="flex justify-between mb-4">
              <a
                href="https://www.linkedin.com/in/aruphui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 flex items-center"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/aruphui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 flex items-center"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com/arup_hui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 flex items-center"
                aria-label="Twitter Profile"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com/arup.hui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 flex items-center"
                aria-label="Instagram Profile"
              >
                <Instagram size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-400 text-center">&copy; 2025 Arup Jyoti Hui</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 p-6 md:p-12">
        {/* About Section */}
        <section id="about" className={`mb-16 transform transition-all duration-700 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-emerald-400 mb-6">About</h3>
          <p className="text-lg leading-relaxed">
          Results-driven Cloud & DevOps Engineer with extensive experience in managing cloud infrastructure, implementing CI/CD pipelines, and utilizing Infrastructure as Code (IaC). Skilled in container orchestration and automation, with proficiency in a wide range of tools and technologies including Docker, Kubernetes, Terraform, Azure DevOps, Jenkins, Git, and Shell Scripting. Expertise in Azure IaaS & PaaS, Azure Networking, AWS, Ansible, and Linux. Adept at optimizing deployment procedures, enhancing system reliability, and driving organizational efficiency.
          </p>
        </section>

        {/* Experience Section - Modified for better mobile display */}
<section 
  id="experience" 
  className={`mb-16 transform transition-all duration-700 ${
    isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
  }`}
  style={{ minHeight: '50px' }} // Add min-height to ensure visibility
>
  <h3 className="text-3xl font-bold text-emerald-400 mb-6">Experience</h3>
  <div className="space-y-8">
    {[
      {
        title: "DevOps Engineer",
        company: "Metlife LTD",
        period: "Sep, 2024 — Present",
        description: "As a DevOps Engineer, I have hands-on experience working with a wide range of technologies, including Terraform Cloud for infrastructure management and automation, Azure DevOps for continuous integration and continuous delivery (CI/CD) pipelines, and Azure Kubernetes Service (AKS) for container orchestration. I have managed AKS upgrades, ensuring the smooth operation of Kubernetes clusters while maintaining optimal performance and security. I have implemented Istio for service mesh management, optimizing microservices communication, monitoring, and security within AKS environments. My expertise extends to PowerShell scripting, where I have automated workflows and integrated various Azure services. Additionally, I have significant experience with Terraform for infrastructure as code, enabling the creation, management, and scaling of cloud resources efficiently. My work includes building and maintaining CI/CD pipelines, automating deployment processes, and ensuring streamlined operations across various cloud services. With a deep understanding of Azure IaaS, PaaS, and DevOps practices, I provide reliable and scalable solutions for cloud infrastructure and application management."
      },
      {
        title: "DevOps Engineer",
        company: "Coforge LTD",
        period: "May, 2023 — Sep, 2024",
        description: "A highly skilled Cloud & DevOps Engineer with extensive experience in designing and implementing CI/CD pipelines using Jenkins and Azure DevOps to streamline software development and optimize deployment workflows. Proficient in Infrastructure as Code (IaC) methodologies, particularly leveraging Terraform for efficient, consistent, and reproducible infrastructure provisioning. Demonstrates deep expertise in the Microsoft Azure cloud platform, with hands-on experience in managing a wide range of services including Virtual Machines, Azure Container Instances, Kubernetes Service, Docker, Azure App Service, and Logic Apps. Committed to integrating best CI/CD and DevOps practices, focusing on automating the entire application lifecycle, from building to testing and deployment. Additionally, exhibits advanced proficiency in AWS, Azure Infrastructure as a Service (IaaS), Azure Networking, implementation of conditional access policies, Azure Storage, policy deployment, Ansible, and Shell scripting, ensuring robust, scalable, and secure cloud solutions."
      },
      {
        title: "Cloud & DevOps Engineer",
        company: "Wipro",
        period: "Nov, 2021 — May, 2023",
        description: "Highly proficient in Azure DevOps practices with a comprehensive understanding of Infrastructure as a Service (IaaS) and Platform as a Service (PaaS). Expertise in cloud computing, Docker, Azure Kubernetes Service (AKS), Git, and various monitoring tools. Proven ability to identify and address security vulnerabilities to maintain robust security postures. Specialized in the development and deployment of serverless technologies, focusing on utilizing Logic Apps and Service Bus for efficient integration processes. Extensive experience in Azure networking, adept at configuring and managing Virtual Networks (Vnets), Load Balancers, Application Gateways, Traffic Managers, ExpressRoute, Network Security Groups (NSGs), Application Security Groups (ASGs), Route Tables, and Network Watcher to ensure optimal network performance and security. Skilled in leveraging Data Analytics to drive informed decision-making and improve operational efficiency. Demonstrated success in orchestrating migrations from on-premises and VMware environments to Azure, showcasing strong project management capabilities."
      }
    ].map((job, index) => (
      <div 
        key={index} 
        className="group relative pl-8 border-l-2 border-gray-700 hover:border-emerald-400 transition-colors"
      >
        <div 
          className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-700 group-hover:bg-emerald-400 transition-colors" 
        />
        <h4 className="text-xl font-semibold mb-1">{job.title}</h4>
        <h5 className="text-lg text-emerald-400 mb-1">{job.company}</h5>
        <p className="text-gray-400 mb-4">{job.period}</p>
        <p className="text-base md:text-base" style={{ wordBreak: 'break-word' }}>{job.description}</p>
      </div>
    ))}
  </div>
</section>

        {/* Skills Section */}
        <section id="skills" className={`mb-16 transform transition-all duration-700 ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-emerald-400 mb-6">Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Azure", "AWS", "Docker", "Kubernetes", "Terraform", "Azure DevOps",
              "CI/CD Pipelines", "Git", "Jenkins", "Infrastructure as Code (IaC)",
              "Monitoring and Logging", "Shell Scripting", "Ansible", "Networking", "Linux"
            ].map((skill, index) => (
              <div key={index} className={`p-4 rounded-lg bg-gray-800 ${!touchDevice ? 'hover:bg-gray-700 hover:-translate-y-1' : 'active:bg-gray-700'} transition-all duration-300`}>
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section - Modified for better mobile response */}
        <section id="projects" className={`mb-16 transform transition-all duration-700 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-emerald-400 mb-6">Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Microservices Deployment on Azure",
                description: "Deployed a scalable and resilient microservices-based application on the Azure Cloud platform, leveraging Azure DevOps for CI/CD, Terraform for IaC, Kubernetes for orchestration, and Docker for containerization.",
                details: [
                  "CI/CD Pipeline Creation: Designed and implemented robust CI/CD pipelines using Azure DevOps, automating the build, test, and deployment processes.",
                  "Infrastructure as Code (IaC): Utilized Terraform to codify the infrastructure setup for the Kubernetes clusters.",
                  "Kubernetes Orchestration: Deployed and managed the Kubernetes clusters with health checks and auto-scaling policies.",
                  "Containerization with Docker: Containerized the microservices using Docker, optimizing images for size and speed.",
                  "Monitoring and Logging: Integrated monitoring and logging solutions to track health and performance."
                ],
                techStack: ["Terraform", "Azure DevOps", "Kubernetes", "Docker", "Azure Monitor"],
              },
              {
                title: "AzureOps: Automated Resource Provisioning",
                description: "Automated the deployment of Azure resources and streamlined day-to-day operations through infrastructure as code and CI/CD pipelines.",
                details: [
                  "Terraform (IaC): Defined Azure resources as code, facilitating version control and consistency.",
                  "Azure DevOps CI/CD Pipeline: Created automated resource provisioning with stages for build, test, and deployment.",
                  "Azure Automation Runbooks: Developed runbooks to automate daily operational tasks.",
                  "GitHub Actions: Integrated GitHub Actions to automate workflows like code validation and testing.",
                  "Ansible Automation: Leveraged Ansible for configuration management and infrastructure orchestration."
                ],
                techStack: ["Terraform", "Azure DevOps", "Azure Automation", "GitHub Actions", "Ansible"],
              },
              {
                title: "Azure Monitor and ServiceNow Integration",
                description: "Integrated Azure Monitor with ServiceNow Event Management to automate incident creation in response to Azure alerts.",
                details: [
                  "ServiceNow Event Management: Automated incident generation based on alerts from Azure Monitor.",
                  "Logic App Integration: Designed a workflow to automatically respond to alerts.",
                  "Kusto Query Language (KQL): Implemented queries to filter and process essential alert data.",
                  "Log Analytics: Stored and managed telemetry data from Azure resources.",
                  "Azure Monitor: Core monitoring and alerting system generating alerts for operational issues."
                ],
                techStack: ["Logic App", "Kusto Query Language", "Log Analytics", "ServiceNow", "Azure Monitor"],
              }
            ].map((project, index) => (
              <div key={index} className={`bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 ${touchDevice ? 'active:bg-gray-700 active:scale-102' : 'hover:scale-105'}`}>
                <h4 className="text-2xl font-semibold text-emerald-400 mb-4">{project.title}</h4>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                {/* Accordion for project details - mobile friendly */}
                <details className="mb-4 cursor-pointer">
                  <summary className="text-emerald-400 font-medium mb-2">View Details</summary>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    {project.details.map((detail, i) => (
                      <li key={i} className="text-gray-300">{detail}</li>
                    ))}
                  </ul>
                </details>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="text-sm text-gray-400 bg-gray-700 rounded-full py-1 px-3">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section - Modified for better mobile response */}
        <section id="certifications" className={`mb-16 transform transition-all duration-700 ${isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-emerald-400 mb-6">Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Microsoft Certified: DevOps Engineer Expert",
                description: "This certification demonstrates the ability to design and implement DevOps practices using Azure technologies.",
                issuedBy: "Microsoft",
                link: "https://learn.microsoft.com/api/credentials/share/en-in/ArupJyotiHui-6587/24E60965F5A73B39?sharingId=CBE802B28DEFAD0"
              },
              {
                title: "HashiCorp Certified: Terraform Associate",
                description: "Validates the knowledge of infrastructure as code using Terraform to manage and provision infrastructure on various cloud platforms.",
                issuedBy: "HashiCorp",
                link: "https://www.credly.com/badges/35d7caf0-752e-49f1-accf-e5b30b09384f/linked_in_profile"
              },
              {
                title: "Microsoft Certified: Azure Network Engineer Associate",
                description: "This certification validates the skills required to implement and manage Azure networking solutions.",
                issuedBy: "Microsoft",
                link: "https://learn.microsoft.com/api/credentials/share/en-us/ArupJyotiHui-6587/1B13A26007F9093A?sharingId"
              },
              {
                title: "Microsoft Certified: Azure Solutions Architect Expert",
                description: "This certification is designed for professionals who design cloud and hybrid solutions on Azure.",
                issuedBy: "Microsoft",
                link: "https://learn.microsoft.com/api/credentials/share/en-us/ArupJyotiHui-6587/F80853163F5A0859?sharingId"
              },
              {
                title: "Microsoft Certified: Azure Administrator Associate",
                description: "This certification validates the skills required to manage Azure subscriptions, implement storage solutions, configure virtual networks.",
                issuedBy: "Microsoft",
                link: "https://learn.microsoft.com/api/credentials/share/en-us/ArupJyotiHui-6587/3F84C2AD81FAF448?sharingId"
              }
            ].map((certification, index) => (
              <div key={index} className={`bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300 ${touchDevice ? 'active:bg-gray-700 active:scale-102' : 'hover:scale-105'} relative overflow-hidden group`}>
                {/* Badge overlay - appears on hover/touch */}
                <div className={`absolute top-2 right-2 rounded-full bg-emerald-500 text-white p-2 transform ${touchDevice ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-300`}>
                  <ExternalLink size={16} />
                </div>
                
                <h4 className="text-2xl font-semibold text-emerald-400 mb-4">{certification.title}</h4>
                <p className="text-gray-300 mb-4">{certification.description}</p>
                <div className="text-gray-400 mb-4">
                  Issued by: <span className="font-semibold">{certification.issuedBy}</span>
                </div>
                <a href={certification.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded px-4 py-2 transition-colors">
                  View Certification
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className={`mb-16 transform transition-all duration-700 ${isVisible.education ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-emerald-400 mb-6">Education</h3>
          <div className="space-y-6">
            {[
              {
                degree: "Master's Degree in Computer Application (MCA)",
                university: "Chandigarh University",
                location: "Chandigarh, Punjab",
                period: "2023 — 2025"
              },
              {
                degree: "Bachelor's Degree in Computer Application (BCA)",
                university: "F.M University",
                location: "Baleswar, Odisha",
                period: "2018 — 2021"
              }
            ].map((edu, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-300">
                <h4 className="text-xl font-semibold mb-2">{edu.degree}</h4>
                <p className="text-emerald-400 mb-1">{edu.university}</p>
                <p className="text-gray-400">{edu.location} | {edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section - Enhanced for better UX */}
        <section id="contact" className={`mb-16 transform transition-all duration-700 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-emerald-400 mb-6">Contact</h3>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-6">Get in touch with me!</p>
            
            <div className="space-y-4">
              <a href="tel:+911234567890" className="flex items-center text-lg text-gray-300 hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-gray-700">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                  <Phone size={20} className="text-emerald-400" />
                </div>
                +91 123 456 7890
              </a>
              
              <a href="mailto:arup.jyoti.hui@example.com" className="flex items-center text-lg text-gray-300 hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-gray-700">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                  <Mail size={20} className="text-emerald-400" />
                </div>
                arup.jyoti.hui@example.com
              </a>
              
              <div className="flex items-center text-lg text-gray-300 p-2 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                  <MapPin size={20} className="text-emerald-400" />
                </div>
                Kolkata, India
              </div>
            </div>

            {/* Contact form could be added here */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-center text-gray-400">Connect with me on social media</p>
              <div className="flex justify-center space-x-6 mt-4">
                <a href="https://www.linkedin.com/in/aruphui" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 flex items-center" aria-label="LinkedIn Profile">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/aruphui" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 flex items-center" aria-label="GitHub Profile">
                  <Github size={24} />
                </a>
                <a href="https://twitter.com/arup_hui" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 flex items-center" aria-label="Twitter Profile">
                  <Twitter size={24} />
                </a>
                <a href="https://instagram.com/arup.hui" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 flex items-center" aria-label="Instagram Profile">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="text-center text-gray-400 pb-8">
          <p>© 2025 Arup Jyoti Hui. All rights reserved.</p>
          <p className="mt-2">Built with React and Tailwind CSS</p>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
