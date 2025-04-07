// Lista de tecnologías y frameworks extraídos del CSV
export const technologies = {
  languages: [
    "HTML", "CSS", "Sass (SCSS)", "Less", "Stylus", "PostCSS", "Styled Components", "Emotion", "Stitches", "Vanilla Extract",
    "JavaScript (Front-end)", "TypeScript (Front-end)", "SSR/SSG frameworks", "Node.js", "NestJS", "Deno", "Build Tools / Bundlers",
    "Java", "Build Tools", "Python (Web)", "Python (Data/ML)", "Python (Visualización)", "Python (HPC)",
    "C#", "C++", "Compilación / Build Tools", "PHP", "Ruby (Web)", "Gestión de gemas / Paquetes",
    "Go (Back-end / Full Stack)", "Rust", "Build / Paquetes", "Scala", "Kotlin", "Dart", "F#", "Visual Basic (.NET)",
    "Ionic", "NativeScript", "Electron", "R", "Julia", "Erlang", "Elixir", "SQL", "XSLT", "WebAssembly", 
    "Ladder Logic (PLC)", "MATLAB", "CUDA", "OpenCL", "MPI (C/C++/Fortran)", "OpenMP (C/C++/Fortran)", "Chapel", "X10", "Fortress",
    "Haskell", "ML", "OCaml", "Scheme", "Lisp", "Apex (Salesforce)", "ABAP (SAP)", "LabVIEW", "Wolfram Language", "ActionScript",
    "MQL4/MQL5", "PeopleCode", "Visual FoxPro", "PL/SQL", "T-SQL", "COBOL", "Ada", "Pascal", "Fortran", "BASIC", "Forth",
    "Brainfuck", "INTERCAL", "Malbolge", "Piet", "Arch / CAD / BIM", "Aeroespacial", "Partículas / Física",
    "Medicina / Imagen Médica", "Bioinformática / Pharma", "Bash", "Zsh", "ksh (KornShell)", "tcsh / csh", "Fish Shell",
    "PowerShell", "Cmd (Windows)", "Google Apps Script", "AutoHotkey (Windows)", "Expect", "Docker", "Kubernetes", "Terraform",
    "Ansible", "Chef", "Puppet", "SaltStack", "Vagrant", "Jenkins", "GitLab CI/CD", "GitHub Actions", "CircleCI", "Travis CI",
    "Azure DevOps Pipelines", "Argo", "Tekton", "VT100 / ANSI / XTerm", "GNU Screen", "tmux", "ncurses", "whiptail / dialog",
    "ConEmu / cmder (Win)", "iTerm2 (macOS)", "rxvt / urxvt", "AppleScript", "FreeDOS / 4DOS"
  ],
  
  frameworks: [
    // Front-end / Markup / Styling
    "Bootstrap", "Tailwind CSS", "Foundation", "Bulma", "Materialize", "Semantic UI", "Pure.css", 
    "Milligram", "Tachyons", "Skeleton", "Primer CSS", "Bourbon", "Compass", "Autoprefixer", "cssnano", 
    "postcss-preset-env", "CSS-in-JS (React)", "CSS-in-TS (lib)",
    
    // JavaScript / TypeScript (Front-end)
    "React", "Angular", "Vue", "Ember.js", "Svelte", "Preact", "Alpine.js", "Solid.js", "Qwik", "Polymer",
    "Deno (runtime)", "RedwoodJS", "Next.js", "Nuxt.js", "Gatsby", "SvelteKit", "Remix", "Astro", "Eleventy",
    
    // JavaScript / TypeScript (Back-end)
    "Express", "Koa", "Hapi", "Sails.js", "Feathers", "Fastify", "Meteor", "TypeORM", "Prisma", 
    "Sequelize", "Passport", "Fresh", "Aleph.js", "Webpack", "Rollup", "Parcel", "Vite", 
    "Snowpack", "esbuild", "Turbopack",
    
    // Java
    "Spring / Spring Boot", "Jakarta EE", "Hibernate", "Micronaut", "Quarkus", "Vaadin", "JSF", 
    "GWT", "Struts", "Maven", "Gradle", "Ant",
    
    // Python
    "Django", "Flask", "FastAPI", "Pyramid", "Tornado", "web2py", "CherryPy", "Bottle", "Hug", 
    "Falcon", "NumPy", "SciPy", "Pandas", "PyTorch", "TensorFlow", "Keras", "Scikit-learn", 
    "XGBoost", "LightGBM", "Matplotlib", "Plotly", "Seaborn", "Bokeh", "Dash", "Dask", "Ray", 
    "PySpark", "mpi4py", "Horovod", "Rapids.ai",
    
    // C#
    ".NET Framework / .NET Core", "ASP.NET Core", "Blazor", "Unity", "Xamarin", "MAUI", "WPF", 
    "WinForms", "NancyFX", "MSBuild", "NuGet",
    
    // C++
    "Qt", "Boost", "POCO", "wxWidgets", "SFML", "JUCE", "Ogre3D", "Unreal Engine", "OpenFrameworks", 
    "Cinder", "OpenCV", "CGAL", "CMake", "Meson", "Autotools", "Ninja",
    
    // PHP
    "Laravel", "Symfony", "CodeIgniter", "Zend (Laminas)", "CakePHP", "Yii", "WordPress", "Joomla", 
    "Drupal", "Magento", "PrestaShop", "phpBB", "MediaWiki", "Composer",
    
    // Ruby / Erlang / Elixir
    "Ruby on Rails", "Sinatra", "Hanami", "Padrino", "Bundler", "Rake", "OTP", "Cowboy", "RabbitMQ",
    "Phoenix", "Nerves", "Ecto",
    
    // Go
    "Gin", "Echo", "Beego", "Buffalo", "Fiber", "gRPC-Go", "Revel",
    
    // Rust
    "Rocket", "Actix", "Tokio", "Axum", "Tonic", "Yew", "Warp", "Cargo",
    
    // Scala
    "Play Framework", "Akka", "Lift", "Scalatra", "Spark (API en Scala)", "sbt",
    
    // Kotlin
    "Ktor", "Spring Boot (Kotlin)", "TornadoFX", "Javalin", "Exposed (ORM)", "Kotlin Multiplatform",
    "Gradle (Kotlin DSL)",
    
    // Dart
    "Flutter", "AngularDart", "Aqueduct",
    
    // F# / .NET
    "Giraffe", "SAFE Stack", 
    
    // ML / Data
    "Shiny", "Tidyverse", "RMarkdown", "Plumber", "data.table", "Caret", "Genie.jl", "Flux.jl", 
    "IHP.jl", "JuMP", "Pluto.jl",
    
    // Lenguajes funcionales
    "Yesod", "Snap", "Scotty", "Servant", "Persistent", "Conduit", "SML/NJ libs", "Moscow ML libs",
    "Ocsigen", "Core/Async", "Reason/Rescript", "Racket", "Chicken Scheme", "Guile", 
    "Common Lisp (Quicklisp)", "CL-WHO", "UCW"
  ]
};

// Función para extraer todos los frameworks de un texto separado por punto y coma
export const parseFrameworks = (text) => {
  if (!text || text === "N/A") return [];
  return text.split(';').map(item => item.trim());
};

// Combinar lenguajes y frameworks en una sola lista para búsqueda
export const getAllTechnologies = () => {
  return [...technologies.languages, ...technologies.frameworks];
};

// Verificar si una tecnología existe en el diccionario
export const validateTechnology = (tech) => {
  const allTech = getAllTechnologies();
  return allTech.some(item => 
    item.toLowerCase() === tech.toLowerCase() || 
    item.toLowerCase().includes(tech.toLowerCase())
  );
}; 