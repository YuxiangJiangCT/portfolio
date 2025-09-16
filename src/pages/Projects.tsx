import { useState } from 'react';
import { ChevronUp, ChevronDown, Filter, ExternalLink, Folder, ArrowLeft, Github, ChevronRight, ChevronLeft, Maximize, Minimize } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// 项目类型定义
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  images: string[];  // 修改为图片数组
  githubLink: string;
  demoLink?: string;
  details?: string;  // 添加详细描述
}

// 标签分类类型
interface TagCategories {
  [category: string]: string[];
}

// 在CSS部分修改项目卡片的宽度和背景色
const projectCardStyle = {
  width: "65%", // 稍微减小宽度，从原来的可能是100%或95%
  height: "100%",
  margin: "0 auto 2rem auto",
  backgroundColor: "#2a2a2a", // 暗灰色背景
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
};

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [imageIndexes, setImageIndexes] = useState<{[key: number]: number}>({});
  const [hiddenDescriptions, setHiddenDescriptions] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  
  // 切换描述显示/隐藏
  const toggleDescription = (projectId: number) => {
    setHiddenDescriptions(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };
  
  // 项目数据
  const projects: Project[] = [
    {
      id: 1,
      title: "TransX Knowledge Graph Network",
      description: "Optimized the TransE model for knowledge graph networking, achieving top accuracy score (Hit@10) of 0.8674 on Wordnet.",
      tags: ["Python", "TensorFlow", "scikit-learn", "NLTK", "NumPy", "Pandas"],
      images: [`${import.meta.env.BASE_URL}img/huawei.png`],
      githubLink: "https://openi.pcl.ac.cn/AAIC/Fast-TransX",
      details: "This project implements and optimizes the TransE model for knowledge graph embedding. The model maps entities and relations into the same vector space, where the relation is interpreted as a translation from head entity to tail entity. The implementation achieves state-of-the-art performance on standard benchmarks like Wordnet and Freebase."
    },
    {
      id: 2,
      title: "Postgraduate Recommendation and Evaluation System",
      description: "Built a web-based system to streamline postgraduate recommendation submissions and evaluations, providing students and faculty with a seamless application management platform. As this project was developed for internal university use, the source code is not publicly available.",
      tags: ["React", "Spring Boot", "MyBatis", "MySQL", "Nginx", "AWS", "JavaScript"],
      images: [
        `${import.meta.env.BASE_URL}img/recommend.png`,
        `${import.meta.env.BASE_URL}img/recommend2.png`,
        `${import.meta.env.BASE_URL}img/recommend3.png`,
        `${import.meta.env.BASE_URL}img/recommend4.png`
      ],
      githubLink: "",
      details: "Developed from December 2023 to March 2024, this system streamlines the postgraduate recommendation process. I designed a robust backend using Spring Boot and MyBatis, supporting academic score management and bonus point applications with optimized database queries. The responsive frontend was built with React, enhancing user experience for both students and administrators. The system implements secure role-based access control with Spring Security, safeguarding sensitive data and ensuring proper administrative permissions. Deployed on AWS using Nginx for routing and load balancing, the application successfully supported over 500 active users in the first month post-launch."
    },
    {
      id: 3,
      title: "Boston Bioprocess Data Visualization Tool",
      description: "Developed a web application for uploading, storing, and visualizing fermentation run data with interactive time series charts for bioprocess analysis.",
      tags: ["React", "FastAPI", "Python", "Docker", "SQLite", "TailwindCSS", "Plotly.js"],
      images: [
        `${import.meta.env.BASE_URL}img/bbs1.png`,
        `${import.meta.env.BASE_URL}img/bbs.png`
      ],
      githubLink: "https://github.com/YuxiangJiangCT/yxj_bbp",
      demoLink: "http://3.14.66.6:3000/",
      details: "This application allows users to upload fermentation run CSV data files, select parameter options for Pump1 and Pump2, and visualize the data as time series charts. The system features CSV file uploads, parameter selection for Pump1 (Glucose or Glycerol) and Pump2 (Base or Acid), data storage in a SQLite database, and interactive time series visualization with Plotly.js. The application is containerized with Docker for easy deployment and uses a Python FastAPI backend with a React and TailwindCSS frontend. The system parses uploaded files, stores processed data in a structured database, and provides intuitive data visualization for bioprocess analysis."
    },
    {
      id: 4,
      title: "CTSDG Image Restoration Network",
      description: "Developed a dual-stream architecture with integrated attention modules, significantly improving image restoration quality as validated by PSNR and SSIM metrics.",
      tags: ["Python", "TensorFlow", "NumPy", "Pandas"],
      images: [`${import.meta.env.BASE_URL}img/huawei.png`],
      githubLink: "https://openi.pcl.ac.cn/AAIC/CTSDG",
      details: "CTSDG is a novel deep learning model designed for image inpainting tasks. It features a dual-stream architecture augmented with attention mechanisms, enabling the network to effectively capture both structural and textural information. The model delivers high-quality and coherent restorations, achieving outstanding performance in quantitative (PSNR/SSIM) and qualitative benchmarks."
    }
  ];

  // 切换项目图片
  const changeImage = (projectId: number, direction: 'next' | 'prev') => {
    const currentIndex = imageIndexes[projectId] || 0;
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const totalImages = project.images.length;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % totalImages;
    } else {
      newIndex = (currentIndex - 1 + totalImages) % totalImages;
    }
    
    setImageIndexes({...imageIndexes, [projectId]: newIndex});
  };

  // 更新筛选器标签列表
  const allTags = [
    "Python", 
    "TensorFlow", 
    "NumPy", 
    "Pandas",
    "scikit-learn",
    "NLTK",
    "React", 
    "FastAPI",
    "Docker", 
    "SQLite", 
    "TailwindCSS", 
    "Plotly.js",
    "Spring Boot", 
    "MyBatis", 
    "MySQL", 
    "Nginx", 
    "AWS", 
    "JavaScript"
  ];
  
  // 更新标签分类
  const tagCategories: TagCategories = {
    "Languages": ["Python", "JavaScript"],
    "Frontend": ["React", "TailwindCSS"],
    "Backend": ["Spring Boot", "FastAPI", "MyBatis"],
    "Databases": ["MySQL", "SQLite"],
    "DevOps": ["Docker", "Nginx", "AWS"],
    "Data Science": ["NumPy", "Pandas", "Plotly.js"],
    "ML / AI": ["TensorFlow", "scikit-learn", "NLTK"]
  };
  
  // 过滤项目
  const filteredProjects = selectedTags.length > 0
    ? projects.filter(project => selectedTags.some(tag => project.tags.includes(tag)))
    : projects;
  
  // 切换标签选择
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  // 清除所有选中的标签
  const clearTags = () => { 
    setSelectedTags([]);
  };

  // 切换项目展开状态
  const toggleProjectExpand = (projectId: number) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <header className="fixed top-0 w-full bg-[#1E1E1E]/80 backdrop-blur-sm z-50">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-mono">Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <Folder className="w-6 h-6" />
              <h2 className="text-3xl font-mono">All Projects ({filteredProjects.length})</h2>
            </div>
          </div>
          
          {/* Skills Filter - 可折叠 */}
          <div className="bg-[#1A1A1A] rounded-lg mb-10 overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between border-b border-white/10 cursor-pointer"
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            >
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <h3 className="font-mono">Core Technologies / Skills</h3>
              </div>
              <button className="text-sm text-gray-400 hover:text-white transition-colors">
                {isFilterExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
            
            {isFilterExpanded && (
              <div className="p-6 space-y-6">
                {Object.entries(tagCategories).map(([category, tags]) => (
                  <div key={category}>
                    <h4 className="text-gray-300 mb-3">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {tags.filter(tag => allTags.includes(tag)).map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-blue-600 text-white'
                              : 'bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A]'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {selectedTags.length > 0 && (
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={clearTags}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Projects Grid - 卡片式布局 */}
          <div className="grid grid-cols-1 gap-8">
            {filteredProjects.map(project => {
              const currentImageIndex = imageIndexes[project.id] || 0;
              const isExpanded = expandedProject === project.id;
              
              return (
                <div 
                  key={project.id} 
                  className="bg-[#1A1A1A] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  style={projectCardStyle}
                >
                  {/* 项目标题和标签 */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-semibold">{project.title}</h3>
                      <div className="flex gap-3">
                        {/* 只在有 GitHub 链接时显示图标 */}
                        {project.githubLink && (
                          <a 
                            href={project.githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-[#2A2A2A] rounded-full hover:bg-[#3A3A3A] transition-colors"
                            title="View on GitHub"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        
                        {project.demoLink && (
                          <a 
                            href={project.demoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-[#2A2A2A] rounded-full hover:bg-[#3A3A3A] transition-colors"
                            title="View Demo"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-[#2A2A2A] text-gray-300 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-gray-300 text-lg">{project.description}</p>
                  </div>
                  
                  {/* 项目图片 - 调整显示方式 */}
                  <div className="relative h-96 overflow-hidden bg-black/20">
                    <img 
                      src={project.images[currentImageIndex]} 
                      alt={project.title}
                      className="w-full h-full object-contain mx-auto"
                    />
                    
                    {/* 图片导航按钮 */}
                    {project.images.length > 1 && (
                      <>
                        <button 
                          onClick={() => changeImage(project.id, 'prev')}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                          onClick={() => changeImage(project.id, 'next')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                    
                    {/* 图片指示器 */}
                    {project.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {project.images.map((_, index) => (
                          <div 
                            key={index}
                            className={`w-3 h-3 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* 展开详情按钮 - 放在图片右下角 */}
                    {project.details && (
                      <button 
                        onClick={() => toggleProjectExpand(project.id)}
                        className="absolute bottom-4 right-4 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                        title={isExpanded ? "Collapse Details" : "Expand Details"}
                      >
                        {isExpanded ? 
                          <Minimize className="w-6 h-6" /> : 
                          <Maximize className="w-6 h-6" />
                        }
                      </button>
                    )}
                  </div>
                  
                  {/* 展开的详细信息 */}
                  {isExpanded && project.details && (
                    <div className="p-6 border-t border-white/10 animate-fadeIn">
                      <h4 className="text-xl font-medium mb-3">Project Details</h4>
                      <p className="text-gray-300 leading-relaxed">
                        {project.details}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部分类导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A]/90 backdrop-blur-sm py-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center space-x-8 md:space-x-16">
            {["ALL", "ML / DATA ANA.", "WEB DEV"].map((category) => (
              <button
                key={category}
                className={`text-sm md:text-base font-mono transition-colors ${
                  activeCategory === category 
                    ? 'text-white font-medium' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
                onClick={() => {
                  setActiveCategory(category);
                  // 根据类别筛选项目
                  if (category === "ALL") {
                    clearTags();
                  } else if (category === "ML / DATA ANA.") {
                    setSelectedTags(["TensorFlow", "NumPy", "Pandas", "scikit-learn", "NLTK"]);
                  } else if (category === "WEB DEV") {
                    setSelectedTags(["React", "JavaScript", "FastAPI", "Spring Boot", "TailwindCSS"]);
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 添加底部间距，防止内容被导航栏遮挡 */}
      <div className="h-20"></div>
    </div>
  );
};

export default Projects; 