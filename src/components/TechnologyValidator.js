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
  Link
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import { getAllTechnologies, validateTechnology } from '../data/technologies';

const TechnologyValidator = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [options] = useState(getAllTechnologies());
  const [stack, setStack] = useState([]);

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
      }
    }
  };

  const handleRemoveFromStack = (tech) => {
    setStack(stack.filter(item => item !== tech));
  };

  const handleClearStack = () => {
    setStack([]);
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

        {/* Stack de tecnologías como tags */}
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
                Tu stack tecnológico
              </Typography>
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
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {stack.map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  color="primary"
                  variant="outlined"
                  onDelete={() => handleRemoveFromStack(tech)}
                  sx={{ 
                    fontWeight: 500,
                    px: 0.5,
                  }}
                />
              ))}
            </Box>
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