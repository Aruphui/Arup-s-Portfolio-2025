import { useState, useEffect } from 'react';
import { Menu, Moon, Sun, ExternalLink, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';

const Portfolio = () => {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isVisible, setIsVisible] = useState({});

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
        threshold: 0.2, // Adjusted threshold for better mobile visibility
        rootMargin: '0px 0px -50% 0px', // Ensures proper section detection on smaller screens
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
                      onClick={() => {
                        setActiveSection(section);
                        setIsMenuOpen(false);
                        document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
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
              >
                <ExternalLink size={20} />
              </a>
              <a
                href="https://instagram.com/arup.hui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 flex items-center"
              >
                <ExternalLink size={20} />
              </a>
              <a
                href="https://x.com/arup_hui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 flex items-center"
              >
                <ExternalLink size={20} />
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

        {/* Experience Section */}
        <section id="experience" className={`mb-16 transform transition-all duration-700 ${isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
              <div key={index} className="group relative pl-8 border-l-2 border-gray-700 hover:border-emerald-400 transition-colors">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-700 group-hover:bg-emerald-400 transition-colors" />
                <h4 className="text-xl font-semibold mb-1">{job.title}</h4>
                <h5 className="text-lg text-emerald-400 mb-1">{job.company}</h5>
                <p className="text-gray-400 mb-4">{job.period}</p>
                <p className="text-base">{job.description}</p>
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
              <div key={index} className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-300">
                {skill}
              </div>
            ))}
          </div>
        </section>
        <section id="projects" className={`mb-16 transform transition-all duration-700 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
  <h3 className="text-3xl font-bold text-emerald-400 mb-6">Projects</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        title: "Microservices Deployment on Azure",
        description: "Deployed a scalable and resilient microservices-based application on the Azure Cloud platform, leveraging Azure DevOps for CI/CD, Terraform for IaC, Kubernetes for orchestration, and Docker for containerization. The goal was to automate the entire software development lifecycle, ensuring high availability and seamless scaling to meet demand..\n\n" +
          "1. CI/CD Pipeline Creation: Designed and implemented robust CI/CD pipelines using Azure DevOps, automating the build, test, and deployment processes. Configured build triggers for automated pipeline execution on code commits, ensuring rapid feedback and reduced time to market.\n\n" +
          "2. Infrastructure as Code (IaC): Utilized Terraform to codify the infrastructure setup for the Kubernetes clusters, including network configurations, VMs, and load balancers. This approach facilitated reproducible and scalable infrastructure provisioning, reducing manual errors and ensuring consistency across environments.\n\n" +
          "3. Kubernetes Orchestration: Deployed and managed the Kubernetes clusters, defining deployments, services, and ingress controllers to ensure high availability and load balancing of the microservices. Implemented health checks and auto-scaling policies to maintain optimal performance under varying loads.\n\n" +
          "4. Containerization with Docker: Containerized the microservices using Docker, optimizing the container images for size and speed to enhance the deployment efficiency and reduce the attack surface.\n\n" +
          "5. Monitoring and Logging: Integrated monitoring and logging solutions to track the health and performance of the microservices and the underlying infrastructure. Configured alerts based on key metrics and logs to proactively address issues and minimize downtime.",
        techStack: ["Terraform", "Azure DevOps", "Kubernetes", "Docker", "Azure Monitor"],
        
      },
      {
        title: "AzureOps: Automated Resource Provisioning and Operations",
        description: "This project aimed to automate the deployment of Azure resources and streamline day-to-day operations. Key components of the project include:\n\n" +
          "1. Terraform (Infrastructure as Code): Utilized Terraform to define Azure resources (e.g., virtual machines, databases) as code. This approach facilitates version control, resource replication, and ensures consistent configuration across environments.\n\n" +
          "2. Azure DevOps CI/CD Pipeline: Used Azure DevOps to create a Continuous Integration and Continuous Deployment pipeline, enabling automated resource provisioning with stages for build, test, and deployment. It promotes consistency and one-click provisioning of resources.\n\n" +
          "3. Azure Automation Runbooks: Developed Azure Automation runbooks to automate daily operational tasks such as backup, scaling, and monitoring. These runbooks help reduce manual intervention and improve operational efficiency.\n\n" +
          "4. GitHub Actions: Integrated GitHub Actions to automate workflows like code validation, testing, and deployment. This integration helps in ensuring faster, reliable deployments while promoting efficient collaboration among team members.\n\n" +
          "5. Ansible Automation: Leveraged Ansible for configuration management and infrastructure orchestration. Ansible facilitated software deployment, enabling consistent and reliable operations across the infrastructure.",
        techStack: ["Terraform", "Azure DevOps", "Azure Automation", "GitHub Actions", "Ansible"],
        
      },
      {
        title: "Azure Monitor and ServiceNow Event Management",
        description: "As a crucial part of our project, we successfully integrated Azure Monitor with ServiceNow Event Management to automate incident creation in response to Azure alerts. This integration not only streamlined our operational processes but also significantly improved incident tracking and management.\n\n" +
          "1. ServiceNow Event Management: The ServiceNow Event Management tool played a pivotal role in the automation of incident generation. It seamlessly received, processed, and managed incidents based on the alerts received from Azure Monitor.\n\n" +
          "2. Logic App Integration: We harnessed the power of Azure Logic App to design a robust workflow that automatically responded to alerts triggered by Azure Monitor.\n\n" +
          "3. Kusto Query Language (KQL) Queries: We developed and implemented KQL queries to filter and process the essential data from Azure Monitor alerts. These queries were instrumental in extracting the critical information needed for instant incident creation.\n\n" +
          "4. Log Analytics: Log Analytics was employed to store and manage the telemetry data collected from our Azure resources. This centralized platform allowed us to effectively analyze and query data, ensuring accurate alert handling. \n\n" +
          "5. Azure Monitor: Azure Monitor was at the core of our monitoring and alerting system for Azure resources. It autonomously generated alerts for various operational issues, serving as the foundation for the entire incident creation process.", 
        techStack: ["Logic App", "Kusto Query Language", "Log Analytics", "ServiceNow", "Azure Monitor"],
        
      }
    ].map((project, index) => (
      <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
        <h4 className="text-2xl font-semibold text-emerald-400 mb-4">{project.title}</h4>
        <p className="text-gray-300 mb-4 whitespace-pre-line">{project.description}</p>
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

<section id="certifications" className={`mb-16 transform transition-all duration-700 ${isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
  <h3 className="text-3xl font-bold text-emerald-400 mb-6">Certifications</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        title: "Microsoft Certified: DevOps Engineer Expert",
        description: "This certification demonstrates the ability to design and implement DevOps practices using Azure technologies. It validates skills in areas such as continuous integration, continuous delivery, infrastructure as code, configuration management, monitoring, and security within the Azure platform.",
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
        description: "This certification validates the skills required to implement and manage Azure networking solutions. It covers topics like virtual networks, network security, load balancing, VPNs, and managing network traffic in Azure, ensuring high availability and security in cloud-based environments.",
        issuedBy: "Microsoft",
        link: "https://learn.microsoft.com/api/credentials/share/en-us/ArupJyotiHui-6587/1B13A26007F9093A?sharingId"
      },
      {
        title: "Microsoft Certified: Azure Solutions Architect Expert",
        description: "This certification is designed for professionals who design cloud and hybrid solutions on Azure. It assesses the ability to design and implement complex Azure solutions, covering areas such as infrastructure, security, data solutions, and monitoring, to ensure scalability, reliability, and security in enterprise applications.",
        issuedBy: "Microsoft",
        link: "https://learn.microsoft.com/api/credentials/share/en-us/ArupJyotiHui-6587/F80853163F5A0859?sharingId"
      },
      {
        title: "Microsoft Certified: Azure Administrator Associate",
        description: "This certification validates the skills required to manage Azure subscriptions, implement storage solutions, configure virtual networks, manage Azure identities and governance, monitor resources, and manage Azure security. It demonstrates the ability to manage and support cloud infrastructure, ensuring efficient and effective use of Azure services in an enterprise environment.",
        issuedBy: "Microsoft",
        link: "https://learn.microsoft.com/api/credentials/share/en-us/ArupJyotiHui-6587/3F84C2AD81FAF448?sharingId"
      }
    ].map((certification, index) => (
      <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
        <h4 className="text-2xl font-semibold text-emerald-400 mb-4">{certification.title}</h4>
        <p className="text-gray-300 mb-4">{certification.description}</p>
        <div className="text-gray-400 mb-4">
          Issued by: <span className="font-semibold">{certification.issuedBy}</span>
        </div>
        <a href={certification.link} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
          View Certification
        </a>
      </div>
    ))}
  </div>
</section>


        {/* Education Section */}
        <section id="education" className={`mb-16 transform transition-all duration-700 ${isVisible.education ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-emerald-400 mb-6">Education</h3>
          <ul className="space-y-6">
          <li>
              <h4 className="text-lg font-semibold">Master’s Degree in Computer Application (MCA)</h4>
              <p className="text-gray-400">Chandigarh University, Chandigarh, Punjab | 2023 — 2025</p>
            </li>

            <li>
              <h4 className="text-lg font-semibold">Bachelor’s Degree in Computer Application (BCA)</h4>
              <p className="text-gray-400">F.M University, Baleswar, Odisha | 2018 — 2021</p>
            </li>
            
          </ul>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`mb-16 transform transition-all duration-700 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className="text-3xl font-bold text-emerald-400 mb-6">Contact</h3>
          <p className="text-lg mb-4">Get in touch with me!</p>
          <p className="flex items-center text-lg text-gray-400"><Phone size={20} className="mr-2" /> +91 123 456 7890</p>
          <p className="flex items-center text-lg text-gray-400"><Mail size={20} className="mr-2" /> arup.jyoti.hui@example.com</p>
          <p className="flex items-center text-lg text-gray-400"><MapPin size={20} className="mr-2" /> Kolkata, India</p>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
