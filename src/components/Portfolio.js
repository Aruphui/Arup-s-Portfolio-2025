import { useState, useEffect } from 'react';
import { Menu, Moon, Sun, ExternalLink, ChevronRight, Phone, Mail, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const Portfolio = () => {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isVisible, setIsVisible] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Check screen size and update isMobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress for progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced intersection observer for better cross-device behavior
  useEffect(() => {
    const options = {
      threshold: isMobile ? 0.1 : 0.2,
      rootMargin: isMobile ? '0px 0px -10% 0px' : '0px 0px -30% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Mark section as visible when it enters viewport
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
          
          // Only update active section if entry is significantly visible (over 30% visible)
          if (entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, options);

    // Make sure all sections are observed
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Force visibility check on mobile when menu is opened
    if (isMobile && isMenuOpen) {
      sections.forEach((section) => {
        setIsVisible((prev) => ({
          ...prev,
          [section.id]: true,
        }));
      });
    }

    return () => observer.disconnect();
  }, [isMobile, isMenuOpen]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Enhanced mobile menu handling
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('aside') && !event.target.closest('button.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    // Handle scroll locking when menu is open on mobile
    if (isMobile) {
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isMobile]);

  // Improved navigation handling for mobile
  const handleNavClick = (section) => {
    // Close menu first on mobile to prevent scroll issues
    setIsMenuOpen(false);
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        // Calculate position accounting for any fixed headers
        const headerOffset = isMobile ? 20 : 30;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        setActiveSection(section);
      }
    }, isMobile ? 300 : 0);
  };

  // Get colors based on theme
  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        bg: 'bg-gray-900',
        text: 'text-gray-100',
        primary: 'text-indigo-400',
        primaryHover: 'hover:text-indigo-300',
        primaryBg: 'bg-indigo-500',
        primaryBgHover: 'hover:bg-indigo-600',
        accent: 'text-rose-400',
        accentBg: 'bg-rose-500',
        accentBgHover: 'hover:bg-rose-600',
        secondary: 'text-teal-400',
        secondaryBg: 'bg-teal-500',
        secondaryBgHover: 'hover:bg-teal-600',
        sidebarBg: 'bg-gray-800',
        cardBg: 'bg-gray-800',
        cardBgHover: 'hover:bg-gray-700',
        skillBg: 'bg-gray-800/80',
        skillBgHover: 'hover:bg-gray-700',
        border: 'border-gray-700',
        menuButton: 'bg-indigo-600',
        buttonText: 'text-white',
        gradientFrom: 'from-indigo-600',
        gradientTo: 'to-rose-500',
      };
    } else {
      return {
        bg: 'bg-gray-50',
        text: 'text-gray-900',
        primary: 'text-indigo-600',
        primaryHover: 'hover:text-indigo-800',
        primaryBg: 'bg-indigo-600',
        primaryBgHover: 'hover:bg-indigo-700',
        accent: 'text-rose-500',
        accentBg: 'bg-rose-500',
        accentBgHover: 'hover:bg-rose-600',
        secondary: 'text-teal-600',
        secondaryBg: 'bg-teal-600',
        secondaryBgHover: 'hover:bg-teal-700',
        sidebarBg: 'bg-white',
        cardBg: 'bg-white',
        cardBgHover: 'hover:bg-gray-100',
        skillBg: 'bg-white',
        skillBgHover: 'hover:bg-gray-100',
        border: 'border-gray-200',
        menuButton: 'bg-indigo-600',
        buttonText: 'text-white',
        gradientFrom: 'from-indigo-600',
        gradientTo: 'to-rose-500',
      };
    }
  };

  const colors = getThemeColors();

  return (
    <div className={`min-h-screen ${colors.bg} ${colors.text} transition-colors duration-300 relative`}>
      {/* Progress bar */}
      <div 
        className={`fixed top-0 left-0 h-1 z-50 bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo}`}
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-4 right-4 p-3 rounded-full ${colors.primaryBg} ${colors.buttonText} z-40 shadow-lg transform transition-transform duration-300 ${scrollProgress > 20 ? 'scale-100' : 'scale-0'}`}
        aria-label="Back to top"
      >
        <ChevronRight size={24} className="transform rotate-270" />
      </button>

      {/* Improved overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden transition-opacity duration-300 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Enhanced Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed top-4 right-4 p-2 rounded-full ${colors.menuButton} ${colors.buttonText} md:hidden z-50 menu-toggle shadow-lg`}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-16 p-2 rounded-full ${colors.menuButton} ${colors.buttonText} z-50 shadow-lg`}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Improved Sidebar/Mobile Menu with Glass effect */}
      <aside
        className={`fixed top-0 h-full ${colors.sidebarBg} backdrop-blur-md bg-opacity-90 transition-all duration-300 ease-in-out z-40 overflow-y-auto border-r ${colors.border}
        ${isMobile 
          ? `left-0 w-full ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`
          : `left-0 w-64 translate-x-0`
        }`}
      >
        <div className="h-full flex flex-col justify-between p-6">
          <div>
            <h1 className={`text-2xl font-bold ${colors.primary} mb-2`}>Arup Jyoti Hui</h1>
            <h2 className="text-gray-400 mb-8">DevOps Engineer</h2>
            <nav>
              <ul className="space-y-4">
                {['about', 'experience', 'projects', 'skills', 'education', 'certifications', 'contact'].map((section) => (
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      className={`group flex items-center space-x-2 text-gray-300 ${colors.primaryHover} transition-colors py-2 ${
                        activeSection === section ? colors.primary : ''
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
                      <span className="capitalize text-lg">{section}</span>
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
                className={`text-gray-400 ${colors.primaryHover} flex items-center`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/aruphui"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${colors.primaryHover} flex items-center`}
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com/arup_hui"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${colors.primaryHover} flex items-center`}
                aria-label="Twitter Profile"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com/arup.hui"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${colors.primaryHover} flex items-center`}
                aria-label="Instagram Profile"
              >
                <Instagram size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-400 text-center">&copy; 2025 Arup Jyoti Hui</p>
          </div>
        </div>
      </aside>

      {/* Improved Main Content with better mobile support */}
      <main className={`transition-all duration-300 ${isMobile ? 'px-4 py-16' : 'md:ml-64 p-6 md:p-12'}`}>
        {/* About Section with gradient text */}
        <section id="about" className={`mb-16 transform transition-all duration-700 min-h-[100px] ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}>About</h3>
          <p className="text-lg leading-relaxed">
          Results-driven Cloud & DevOps Engineer with extensive experience in managing cloud infrastructure, implementing CI/CD pipelines, and utilizing Infrastructure as Code (IaC). Skilled in container orchestration and automation, with proficiency in a wide range of tools and technologies including Docker, Kubernetes, Terraform, Azure DevOps, Jenkins, Git, and Shell Scripting. Expertise in Azure IaaS & PaaS, Azure Networking, AWS, Ansible, and Linux. Adept at optimizing deployment procedures, enhancing system reliability, and driving organizational efficiency.
          </p>
        </section>

        {/* Experience Section - Modified to show all content */}
        <section id="experience" className={`mb-16 transform transition-all duration-700 min-h-[100px] ${isVisible.experience ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}>Experience</h3>
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
              <div key={index} className={`group relative pl-8 border-l-2 border-gray-700 hover:border-indigo-400 transition-colors pb-6 ${index !== 2 ? 'border-dashed' : ''}`}>
                <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full bg-gray-700 group-hover:${colors.primaryBg.replace('bg-', '')} transition-colors`} />
                <h4 className="text-xl font-semibold mb-1">{job.title}</h4>
                <h5 className={`text-lg ${colors.primary} mb-1`}>{job.company}</h5>
                <p className="text-gray-400 mb-4">{job.period}</p>
                <p className="text-base" style={{ wordBreak: 'break-word' }}>{job.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section with improved animation */}
        <section id="skills" className={`mb-16 transform transition-all duration-700 min-h-[100px] ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}>Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Azure", "AWS", "Docker", "Kubernetes", "Terraform", "Azure DevOps", "Gitlab",
              "CI/CD Pipelines", "Git", "Jenkins", "Infrastructure as Code (IaC)",
              "Monitoring and Logging", "Shell Scripting", "Ansible", "Networking", "Linux"
            ].map((skill, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg ${colors.skillBg} ${colors.skillBgHover} transition-all duration-300 text-center backdrop-blur-sm transform hover:scale-105 shadow-md border border-opacity-20 ${colors.border}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section - Modified with card hover effects */}
        <section id="projects" className={`mb-16 transform transition-all duration-700 min-h-[100px] ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}>Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Microservices Deployment on Azure",
                description: "Deployed a scalable and resilient microservices-based application on the Azure Cloud platform, leveraging Azure DevOps for CI/CD, Terraform for IaC, Kubernetes for orchestration, and Docker for containerization. The goal was to automate the entire software development lifecycle, ensuring high availability and seamless scaling to meet demand",
                details: [
                  "CI/CD Pipeline Creation: Designed and implemented robust CI/CD pipelines using Azure DevOps, automating the build, test, and deployment processes. Configured build triggers for automated pipeline execution on code commits, ensuring rapid feedback and reduced time to market.",
                  "Infrastructure as Code (IaC): Utilized Terraform to codify the infrastructure setup for the Kubernetes clusters, including network configurations, VMs, and load balancers. This approach facilitated reproducible and scalable infrastructure provisioning, reducing manual errors and ensuring consistency across environments.",
                  "Kubernetes Orchestration: Deployed and managed the Kubernetes clusters, defining deployments, services, and ingress controllers to ensure high availability and load balancing of the microservices. Implemented health checks and auto-scaling policies to maintain optimal performance under varying loads.",
                  "Containerization with Docker: Containerized the microservices using Docker, optimizing the container images for size and speed to enhance the deployment efficiency and reduce the attack surface.",
                  "Monitoring and Logging: Integrated monitoring and logging solutions to track the health and performance of the microservices and the underlying infrastructure. Configured alerts based on key metrics and logs to proactively address issues and minimize downtime."
                ],
                techStack: ["Terraform", "Azure DevOps", "Kubernetes", "Docker", "Azure Monitor"],
              },
              {
                title: "AzureOps: Automated Resource Provisioning and Operations",
                description: "This project aimed to automate the deployment of Azure resources and streamline day-to-day operations. Key components of the project include",
                details: [
                  "Terraform (Infrastructure as Code): Utilized Terraform to define Azure resources (e.g., virtual machines, databases) as code. This approach facilitates version control, resource replication, and ensures consistent configuration across environments.",
                  "Azure DevOps CI/CD Pipeline: Used Azure DevOps to create a Continuous Integration and Continuous Deployment pipeline, enabling automated resource provisioning with stages for build, test, and deployment. It promotes consistency and one-click provisioning of resources.",
                  "Azure Automation Runbooks: Developed Azure Automation runbooks to automate daily operational tasks such as backup, scaling, and monitoring. These runbooks help reduce manual intervention and improve operational efficiency.",
                  "GitHub Actions: Integrated GitHub Actions to automate workflows like code validation, testing, and deployment. This integration helps in ensuring faster, reliable deployments while promoting efficient collaboration among team members.",
                  "Ansible Automation: Leveraged Ansible for configuration management and infrastructure orchestration. Ansible facilitated software deployment, enabling consistent and reliable operations across the infrastructure."
                ],
                techStack: ["Terraform", "Azure DevOps", "Azure Automation", "GitHub Actions", "Ansible"],
              },
              {
                title: "Azure Monitor and ServiceNow Event Management",
                description: "As a crucial part of our project, we successfully integrated Azure Monitor with ServiceNow Event Management to automate incident creation in response to Azure alerts. This integration not only streamlined our operational processes but also significantly improved incident tracking and management.",
                details: [
                  "ServiceNow Event Management: The ServiceNow Event Management tool played a pivotal role in the automation of incident generation. It seamlessly received, processed, and managed incidents based on the alerts received from Azure Monitor.",
                  "Logic App Integration: We harnessed the power of Azure Logic App to design a robust workflow that automatically responded to alerts triggered by Azure Monitor.",
                  "Kusto Query Language (KQL) Queries: We developed and implemented KQL queries to filter and process the essential data from Azure Monitor alerts. These queries were instrumental in extracting the critical information needed for instant incident creation.",
                  "Log Analytics: Log Analytics was employed to store and manage the telemetry data collected from our Azure resources. This centralized platform allowed us to effectively analyze and query data, ensuring accurate alert handling.",
                  "Azure Monitor: Azure Monitor was at the core of our monitoring and alerting system for Azure resources. It autonomously generated alerts for various operational issues, serving as the foundation for the entire incident creation process."
                ],
                techStack: ["Logic App", "Kusto Query Language", "Log Analytics", "ServiceNow", "Azure Monitor"],
              }
            ].map((project, index) => (
              <div 
                key={index} 
                className={`${colors.cardBg} p-6 rounded-lg shadow-lg transition-all duration-500 group hover:transform hover:translate-y-[-10px] active:translate-y-[-10px] backdrop-blur-sm border border-opacity-30 ${colors.border}`}
              >
                <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-t-lg mb-4 absolute top-0 left-0 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"/>
                
                <h4 className={`text-2xl font-semibold ${colors.primary} mb-4 group-hover:translate-x-2 transition-transform duration-300`}>{project.title}</h4>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                {/* Project details with improved styling */}
                <div className="mb-4 overflow-hidden">
                  <h5 className={`${colors.secondary} font-medium mb-2`}>Details</h5>
                  <ul className="list-none pl-0 space-y-2">
                    {project.details.map((detail, i) => (
                      <li key={i} className="text-gray-300 pl-4 border-l-2 border-indigo-400 hover:border-rose-400 transition-colors">{detail}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, tIndex) => (
                    <span 
                      key={tIndex} 
                      className={`text-sm text-gray-200 bg-opacity-30 ${colors.primaryBg} rounded-full py-1 px-3 transition-all duration-300 hover:bg-opacity-50`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Section with improved card design */}
        <section id="certifications" className={`mb-16 transform transition-all duration-700 min-h-[100px] ${isVisible.certifications ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}>Certifications</h3>
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
              <div 
                key={index} 
                className={`${colors.cardBg} p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-105 relative overflow-hidden group border border-opacity-30 ${colors.border} backdrop-blur-sm`}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Badge overlay with animation */}
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-indigo-600/20 rounded-full transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                
                <h4 className={`text-xl font-semibold ${colors.primary} mb-2 relative z-10`}>{certification.title}</h4>
                <p className="text-gray-400 mb-4 relative z-10">Issued by {certification.issuedBy}</p>
                <p className="text-gray-300 mb-4 relative z-10">{certification.description}</p>
                <a 
                  href={certification.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 ${colors.primary} hover:underline transition-all group-hover:translate-x-1 duration-300 relative z-10`}
                >
                  <span>View Certificate</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className={`mb-16 transform transition-all duration-700 min-h-[100px] ${isVisible.education ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}>Education</h3>
          <div className="space-y-8">
            {[
              {
                degree: "Bachelor of Computer Applications",
                institution: "Fakir Mohan University, Baleswar",
                period: "2018 — 2021",
                
              }
              {
                degree: "Master of Computer Applications",
                institution: "Chandigarh University, Chandigarh",
                period: "2023 — 2025",
                
              }
            ].map((edu, index) => (
              <div key={index} className={`group ${colors.cardBg} p-6 rounded-lg shadow-lg transition-all duration-300 border border-opacity-30 ${colors.border} hover:border-indigo-400 backdrop-blur-sm`}>
                <h4 className="text-xl font-semibold mb-1">{edu.degree}</h4>
                <h5 className={`text-lg ${colors.primary} mb-1`}>{edu.institution}</h5>
                <p className="text-gray-400 mb-4">{edu.period}</p>
                <p className="text-gray-300">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`mb-16 transform transition-all duration-700 min-h-[100px] ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h3 className={`text-3xl font-bold mb-6 bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo} bg-clip-text text-transparent`}>Contact</h3>
          <div className={`${colors.cardBg} p-8 rounded-lg shadow-lg mb-8 border border-opacity-30 ${colors.border} backdrop-blur-sm`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-6">Get In Touch</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${colors.primaryBg} text-white`}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <a href="mailto:arupjyoti699@gmail.com" className={`${colors.primary} hover:underline`}>arupjyoti699@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${colors.primaryBg} text-white`}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <a href="tel:+916372809100" className={`${colors.primary} hover:underline`}>+91 6372809100</a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${colors.primaryBg} text-white`}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-gray-400">Location</p>
                      <p className={`${colors.primary}`}>Hyderabad, India</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-6">Connect</h4>
                <p className="text-gray-300 mb-6">
                  Let's connect on social media for professional networking and updates.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/aruphui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${colors.primaryBg} ${colors.buttonText} ${colors.primaryBgHover} transition-colors`}
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/aruphui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${colors.primaryBg} ${colors.buttonText} ${colors.primaryBgHover} transition-colors`}
                    aria-label="GitHub Profile"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://twitter.com/arup_hui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${colors.primaryBg} ${colors.buttonText} ${colors.primaryBgHover} transition-colors`}
                    aria-label="Twitter Profile"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="https://instagram.com/arup.hui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${colors.primaryBg} ${colors.buttonText} ${colors.primaryBgHover} transition-colors`}
                    aria-label="Instagram Profile"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pb-6 pt-12 border-t border-gray-700">
          <p className="text-gray-400">
            &copy; 2025 Arup Jyoti Hui. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with React and Tailwind CSS
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Portfolio;
