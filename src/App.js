import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react';

function App() {
  const [names, setNames] = useState([]);
  const [activeNameInput, setActiveNameInput] = useState('');
  const [config, setConfig] = useState({
    type: 'camel', // camel | snake | kebab | pascal
    variableType: 'none', // none | camel | snake | kebab | pascal
  });

  const toast = useToast();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" backgroundColor={'#2F2F3A'}>
        <Grid minH="100vh" p={5}>
          <Card>
            <CardBody>
              <Grid>
                <div>
                  <h2>Digite aqui suas variáveis</h2>
                  <div className="input">
                    <Input
                      type="text"
                      value={activeNameInput}
                      onChange={e => {
                        if (!e.target.value.includes(' ')) {
                          setActiveNameInput(e.target.value);
                        } else {
                          let namesCopy = names;
                          if (e.target.value.split(' ').length > 1) {
                            for (
                              let i = 0;
                              i < e.target.value.split(' ').length;
                              i++
                            ) {
                              if (e.target.value.split(' ')[i].length > 1)
                                namesCopy.push(e.target.value.split(' ')[i]);
                            }
                          } else {
                            namesCopy.push(e.target.value);
                          }
                          setNames([...namesCopy]);
                          setActiveNameInput('');
                        }
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h1>Configurações da função</h1>
                  <Grid templateColumns="repeat(4, 1fr)" gap={5} marginY={5}>
                    <Button
                      bgColor={config.type === 'camel' ? '#408768' : ''}
                      color={config.type === 'camel' ? '#fff' : ''}
                      onClick={() => {
                        setConfig({ ...config, type: 'camel' });
                      }}
                    >
                      Camel Case
                    </Button>
                    <Button
                      bgColor={config.type === 'snake' ? '#408768' : ''}
                      color={config.type === 'snake' ? '#fff' : ''}
                      onClick={() => {
                        setConfig({ ...config, type: 'snake' });
                      }}
                    >
                      Snake Case
                    </Button>
                    <Button
                      bgColor={config.type === 'kebab' ? '#408768' : ''}
                      color={config.type === 'kebab' ? '#fff' : ''}
                      onClick={() => {
                        setConfig({ ...config, type: 'kebab' });
                      }}
                    >
                      Kebab Case
                    </Button>
                    <Button
                      bgColor={config.type === 'pascal' ? '#408768' : ''}
                      color={config.type === 'pascal' ? '#fff' : ''}
                      onClick={() => {
                        setConfig({ ...config, type: 'pascal' });
                      }}
                    >
                      Pascal Case
                    </Button>
                  </Grid>
                </div>
                <div>
                  <h1>Configurações da variável</h1>
                  <Grid templateColumns="repeat(4, 1fr)" gap={5} marginY={5}>
                    <Button
                      bgColor={config.variableType === 'camel' ? '#408768' : ''}
                      color={config.variableType === 'camel' ? '#fff' : ''}
                      onClick={() => {
                        setConfig({ ...config, variableType: 'camel' });
                      }}
                    >
                      Camel Case
                    </Button>
                    <Button
                      bgColor={config.variableType === 'snake' ? '#408768' : ''}
                      color={config.variableType === 'snake' ? '#fff' : ''}
                      onClick={() => {
                        setConfig({ ...config, variableType: 'snake' });
                      }}
                    >
                      Snake Case
                    </Button>
                    <Button
                      bgColor={config.variableType === 'kebab' ? '#408768' : ''}
                      color={config.variableType === 'kebab' ? '#fff' : ''}
                      onClick={() => {
                        setConfig({ ...config, variableType: 'kebab' });
                      }}
                    >
                      Kebab Case
                    </Button>
                    <Button
                      bgColor={
                        config.variableType === 'pascal' ? '#408768' : ''
                      }
                      color={config.variableType === 'pascal' ? '#fff' : ''}
                      onClick={() => {
                        setConfig({ ...config, variableType: 'pascal' });
                      }}
                    >
                      Pascal Case
                    </Button>
                  </Grid>
                </div>
              </Grid>
              {names.length > 0 && (
                <>
                  <Text>Resultado:</Text>
                  <Grid
                    maxH={'500px'}
                    overflowY={'scroll'}
                    bgColor={'#2F2F3A'}
                    borderRadius={6}
                    padding={5}
                    position={'relative'}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        marginTop: '5px',
                        width: 100,
                        color: '#fff',
                      }}
                    >
                      <Button
                        onClick={() => {
                          let data = names.map((x, y) => {
                            return `const [${
                              config.variableType === 'none'
                                ? x
                                : config.variableType === 'pascal'
                                ? capitalizeFirstLetter(x)
                                : config.variableType === 'camel'
                                ? lowerFirstLetter(x)
                                : x.toLowerCase()
                            }, ${config.type === 'pascal' ? 'S' : 's'}et${
                              config.type === 'snake'
                                ? '_'
                                : config.type === 'kebab'
                                ? '-'
                                : ''
                            }${
                              config.type === 'camel' ||
                              config.type === 'pascal'
                                ? capitalizeFirstLetter(x)
                                : x.toLowerCase()
                            }] = useState("")`;
                          });

                          navigator.clipboard.writeText(data.join('\n'));
                          toast({
                            title: 'Estados copiados.',
                            description: 'Aproveite!',
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                          });
                        }}
                      >
                        COPY
                      </Button>
                    </div>
                    <Box className="code" color={'#FBF8E7'}>
                      <pre>
                        {names.map((x, y) => {
                          return (
                            <div key={y}>
                              const [
                              {config.variableType === 'none'
                                ? x
                                : config.variableType === 'pascal'
                                ? capitalizeFirstLetter(x)
                                : config.variableType === 'camel'
                                ? lowerFirstLetter(x)
                                : x.toLowerCase()}
                              , {config.type === 'pascal' ? 'S' : 's'}
                              et
                              {config.type === 'snake'
                                ? '_'
                                : config.type === 'kebab'
                                ? '-'
                                : ''}
                              {config.type === 'camel' ||
                              config.type === 'pascal'
                                ? capitalizeFirstLetter(x)
                                : x.toLowerCase()}
                              ] = useState("")
                            </div>
                          );
                        })}
                      </pre>
                    </Box>
                  </Grid>
                </>
              )}
            </CardBody>
          </Card>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
/* 

import { useState } from "react";

function App() {
  const [names, setNames] = useState([]);
  const [activeNameInput, setActiveNameInput] = useState("");
  const [config, setConfig] = useState({
    type: "camel", // camel | snake | kebab | pascal
    variableType: "none", // none | camel | snake | kebab | pascal
  });

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div className="App">
        <h2>Digite aqui suas variáveis</h2>
        <div className="input">
          <input
            type="text"
            value={activeNameInput}
            onChange={(e) => {
              if (!e.target.value.includes(" "))
                setActiveNameInput(e.target.value);
              else {
                let namesCopy = names;
                if (e.target.value.split(" ").length > 1) {
                  for (let i = 0; i < e.target.value.split(" ").length; i++) {
                    namesCopy.push(e.target.value.split(" ")[i]);
                  }
                } else {
                  namesCopy.push(e.target.value);
                }
                setNames([...namesCopy]);
                setActiveNameInput("");
              }
            }}
          />
        </div>
      </div>
      {names.length > 0 && (
        <div className="code">
          <pre>
            {names.map((x, y) => {
              return (
                <div key={y}>
                  const [
                  {config.variableType === "none"
                    ? x
                    : config.variableType ==== "camel" ||
                      config.variableType ==== "pascal"
                    ? capitalizeFirstLetter(x)
                    : x.toLowerCase()}
                  , {config.type ==== "pascal" ? "S" : "s"}
                  et
                  {config.type ==== "snake"
                    ? "_"
                    : config.type ==== "kebab"
                    ? "-"
                    : ""}
                  {config.type ==== "camel" || config.type ==== "pascal"
                    ? capitalizeFirstLetter(x)
                    : x.toLowerCase()}
                  ] = useState("")
                </div>
              );
            })}
          </pre>
        </div>
      )}
      <div>
        <h1>Configurações da função</h1>
        <button
          onClick={() => {
            setConfig({ ...config, type: "camel" });
          }}
        >
          Camel Case
        </button>
        <button
          onClick={() => {
            setConfig({ ...config, type: "snake" });
          }}
        >
          Snake Case
        </button>
        <button
          onClick={() => {
            setConfig({ ...config, type: "kebab" });
          }}
        >
          Kebab Case
        </button>
      </div>
      <div>
        <h1>Configurações da variável</h1>
        <button
          onClick={() => {
            setConfig({ ...config, variableType: "camel" });
          }}
        >
          Camel Case
        </button>
        <button
          onClick={() => {
            setConfig({ ...config, variableType: "snake" });
          }}
        >
          Snake Case
        </button>
        <button
          onClick={() => {
            setConfig({ ...config, variableType: "kebab" });
          }}
        >
          Kebab Case
        </button>
      </div>
    </>
  );
}

export default App;


*/
