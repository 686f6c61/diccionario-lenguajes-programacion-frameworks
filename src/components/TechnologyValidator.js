import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Paper, 
  Typography, 
  Box, 
  Container,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Link,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Divider,
  Alert,
  Stack,
  Menu,
  MenuItem
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ReactMarkdown from 'react-markdown';

import { getAllTechnologies, validateTechnology } from '../data/technologies';
import { getTechnologyInfo } from '../services/openai';

const TechnologyValidator = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [options] = useState(getAllTechnologies());
  const [stack, setStack] = useState([]);
  const [techInfo, setTechInfo] = useState({});
  const [loading, setLoading] = useState({});
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTech, setCurrentTech] = useState('');

  // Verificar si la API key está configurada
  useEffect(() => {
    if (!process.env.REACT_APP_OPENAI_API_KEY || 
        process.env.REACT_APP_OPENAI_API_KEY === 'tu_api_key_aqui') {
      setApiKeyMissing(true);
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Reset de la validación al cambiar el input
    setIsValid(null);
  };

  const handleValidate = () => {
    if (inputValue) {
      const valid = validateTechnology(inputValue);
      setIsValid(valid);
      
      // Si es válido y no está ya en el stack, añadirlo
      if (valid && !stack.includes(inputValue)) {
        setStack([...stack, inputValue]);
        // Limpiar el campo de entrada después de añadir al stack
        setInputValue('');
        
        // Si no tenemos la API key, no intentamos obtener la descripción
        if (!apiKeyMissing) {
          // Obtener información de la tecnología
          fetchTechnologyInfo(inputValue);
        }
      }
    }
  };

  const fetchTechnologyInfo = async (technology) => {
    // Establecer el estado de carga para esta tecnología
    setLoading(prev => ({ ...prev, [technology]: true }));
    
    try {
      const info = await getTechnologyInfo(technology);
      setTechInfo(prev => ({ ...prev, [technology]: info }));
    } catch (error) {
      console.error(`Error al obtener información para ${technology}:`, error);
      setTechInfo(prev => ({ 
        ...prev, 
        [technology]: { 
          description: `Error al obtener información sobre ${technology}: ${error.message}`,
          curiosity: `No se encontraron datos curiosos sobre ${technology}.`,
          officialUrl: `https://www.google.com/search?q=${encodeURIComponent(technology)}+official+website`,
          wikipediaUrl: `https://es.wikipedia.org/wiki/${encodeURIComponent(technology)}`
        }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [technology]: false }));
    }
  };

  const handleRemoveFromStack = (tech) => {
    setStack(stack.filter(item => item !== tech));
    // También eliminamos su información
    const newTechInfo = { ...techInfo };
    delete newTechInfo[tech];
    setTechInfo(newTechInfo);
  };

  const handleClearStack = () => {
    setStack([]);
    setTechInfo({});
  };

  const handleDownloadClick = (event, tech) => {
    setAnchorEl(event.currentTarget);
    setCurrentTech(tech);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const generateMarkdown = (tech) => {
    const info = techInfo[tech];
    if (!info) return '';
    
    return `# ${tech}

## Descripción técnica
${info.description}

## Curiosidad
${info.curiosity}

## Enlaces
- [Sitio oficial](${info.officialUrl})
- [Wikipedia](${info.wikipediaUrl})
`;
  };

  const generateText = (tech) => {
    const info = techInfo[tech];
    if (!info) return '';
    
    return `${tech}

DESCRIPCIÓN TÉCNICA:
${info.description}

CURIOSIDAD:
${info.curiosity}

ENLACES:
- Sitio oficial: ${info.officialUrl}
- Wikipedia: ${info.wikipediaUrl}
`;
  };

  const generateAllMarkdown = () => {
    return stack.map(tech => generateMarkdown(tech)).join('\n\n---\n\n');
  };

  const generateAllText = () => {
    return stack.map(tech => generateText(tech)).join('\n\n=================\n\n');
  };

  const downloadFile = (content, filename) => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownload = (format) => {
    if (format === 'all-md') {
      downloadFile(generateAllMarkdown(), 'stack-tecnologico.md');
    } else if (format === 'all-txt') {
      downloadFile(generateAllText(), 'stack-tecnologico.txt');
    } else if (format === 'md') {
      downloadFile(generateMarkdown(currentTech), `${currentTech.toLowerCase().replace(/\s+/g, '-')}.md`);
    } else if (format === 'txt') {
      downloadFile(generateText(currentTech), `${currentTech.toLowerCase().replace(/\s+/g, '-')}.txt`);
    }
    handleCloseMenu();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 2,
          backgroundColor: '#ffffff'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: '#333',
            fontWeight: 600,
            textAlign: 'center',
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          <CodeIcon fontSize="large" color="primary" />
          Diccionario de lenguajes de programación y frameworks
        </Typography>
        
        {apiKeyMissing && (
          <Alert 
            severity="warning" 
            sx={{ mb: 3 }}
            action={
              <Button 
                color="inherit" 
                size="small"
                component={Link}
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
              >
                Obtener API Key
              </Button>
            }
          >
            No se ha configurado la API key de OpenAI. Las descripciones de tecnologías no estarán disponibles.
            Configure la clave en el archivo .env (REACT_APP_OPENAI_API_KEY).
          </Alert>
        )}
        
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="body2" 
            color="textSecondary"
            sx={{ mb: 1, textAlign: 'center' }}
          >
            Busca y valida si una tecnología está en nuestro diccionario de 125 tecnologías y 300 frameworks
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1,
          justifyContent: 'center'
        }}>
          <TextField 
            label="Tecnología o framework" 
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            sx={{ 
              maxWidth: '400px',
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                backgroundColor: '#f9f9f9',
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleValidate();
              }
            }}
          />
          
          <Tooltip title="Validar">
            <Button 
              variant="contained"
              onClick={handleValidate}
              startIcon={<CheckIcon />}
              sx={{ 
                bgcolor: '#3f51b5', 
                '&:hover': { bgcolor: '#303f9f' },
                height: '56px'
              }}
            >
              Validar
            </Button>
          </Tooltip>
        </Box>

        {isValid !== null && (
          <Box 
            sx={{ 
              mt: 3, 
              p: 2, 
              borderRadius: 1.5, 
              bgcolor: isValid ? 'rgba(46, 125, 50, 0.08)' : 'rgba(211, 47, 47, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            {isValid ? (
              <>
                <CheckCircleIcon color="success" />
                <Typography variant="body1" color="success.main">
                  ¡La tecnología está registrada en nuestro diccionario!
                </Typography>
                <Chip 
                  label="Válida" 
                  color="success" 
                  size="small" 
                  sx={{ ml: 'auto' }}
                />
              </>
            ) : (
              <>
                <CancelIcon color="error" />
                <Typography variant="body1" color="error">
                  Esta tecnología no está en nuestro listado de 125 tecnologías y 300 frameworks.
                </Typography>
                <Chip 
                  label="No reconocida" 
                  color="error" 
                  size="small" 
                  sx={{ ml: 'auto' }}
                />
              </>
            )}
          </Box>
        )}

        {/* Stack de tecnologías como cards */}
        {stack.length > 0 && (
          <Box 
            sx={{ 
              mt: 4, 
              p: 2, 
              borderRadius: 1.5, 
              bgcolor: 'rgba(63, 81, 181, 0.08)',
              mx: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="primary">
                Stack tecnológico
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="primary" 
                  startIcon={<FileDownloadIcon />}
                  onClick={(e) => handleDownloadClick(e, 'all')}
                >
                  Descargar todo
                </Button>
                <Button 
                  size="small" 
                  variant="outlined" 
                  color="error" 
                  startIcon={<DeleteIcon />}
                  onClick={handleClearStack}
                >
                  Limpiar
                </Button>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {stack.map((tech, index) => (
                <Card 
                  key={index} 
                  variant="outlined"
                  sx={{ 
                    borderColor: 'primary.light',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        component="div" 
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {tech}
                      </Typography>
                      <Box sx={{ display: 'flex' }}>
                        <Tooltip title="Descargar">
                          <IconButton
                            onClick={(e) => handleDownloadClick(e, tech)}
                            size="small"
                            color="primary"
                          >
                            <DownloadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                          <IconButton
                            onClick={() => handleRemoveFromStack(tech)}
                            size="small"
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    
                    {!apiKeyMissing && (
                      <>
                        <Divider sx={{ mb: 2 }} />
                        
                        {loading[tech] ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                            <CircularProgress size={20} color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              Obteniendo información técnica...
                            </Typography>
                          </Box>
                        ) : techInfo[tech] ? (
                          <>
                            {/* Descripción técnica */}
                            <Box 
                              sx={{ 
                                mb: 2,
                                display: 'flex', 
                                alignItems: 'flex-start',
                                gap: 1
                              }}
                            >
                              <DescriptionIcon 
                                color="primary" 
                                fontSize="small" 
                                sx={{ mt: 0.5 }}
                              />
                              <Box>
                                <Typography variant="subtitle2" color="primary" gutterBottom>
                                  Descripción técnica
                                </Typography>
                                <ReactMarkdown>
                                  {techInfo[tech].description}
                                </ReactMarkdown>
                              </Box>
                            </Box>
                            
                            {/* Curiosidad */}
                            {techInfo[tech].curiosity && (
                              <Box 
                                sx={{ 
                                  mb: 2, 
                                  display: 'flex', 
                                  alignItems: 'flex-start',
                                  gap: 1,
                                  p: 1.5,
                                  borderRadius: 2,
                                  bgcolor: 'rgba(255, 193, 7, 0.08)',
                                }}
                              >
                                <LightbulbIcon 
                                  color="warning" 
                                  fontSize="small"
                                  sx={{ mt: 0.5 }}
                                />
                                <Box>
                                  <Typography variant="subtitle2" color="warning.dark" gutterBottom>
                                    ¿Sabías que...?
                                  </Typography>
                                  <Typography variant="body2">
                                    {techInfo[tech].curiosity}
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                            
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                              {techInfo[tech].officialUrl && (
                                <Button
                                  startIcon={<HomeIcon />}
                                  variant="outlined"
                                  size="small"
                                  href={techInfo[tech].officialUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  color="primary"
                                >
                                  Sitio oficial
                                </Button>
                              )}
                              
                              {techInfo[tech].wikipediaUrl && (
                                <Button
                                  startIcon={<ArticleIcon />}
                                  variant="outlined"
                                  size="small"
                                  href={techInfo[tech].wikipediaUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  color="secondary"
                                >
                                  Wikipedia
                                </Button>
                              )}
                            </Stack>
                          </>
                        ) : null}
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
            
            {/* Menú de descarga para tecnología individual */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {currentTech === 'all' ? (
                <>
                  <MenuItem onClick={() => handleDownload('all-md')}>Descargar en Markdown (.md)</MenuItem>
                  <MenuItem onClick={() => handleDownload('all-txt')}>Descargar en Texto (.txt)</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => handleDownload('md')}>Descargar en Markdown (.md)</MenuItem>
                  <MenuItem onClick={() => handleDownload('txt')}>Descargar en Texto (.txt)</MenuItem>
                </>
              )}
            </Menu>
          </Box>
        )}

        {/* Footer */}
        <Box 
          component="footer" 
          sx={{ 
            mt: 6, 
            pt: 3, 
            borderTop: '1px solid #eaeaea',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Diccionario de tecnologías y frameworks 2025 - Modifica y disfruta. 
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Descarga el diccionario de lenguajes de programación (225) y Frameworks (300) del repo de github
            </Typography>
            <Link 
              href="https://github.com/686f6c61/diccionario-lenguajes-programacion-frameworks" 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ display: 'inline-flex', alignItems: 'center' }}
              color="primary"
            >
              <GitHubIcon fontSize="small" />
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TechnologyValidator; 