import React from 'react'
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    Image,
    
  } from '@chakra-ui/react';

const Card = ({pokemon}) => {
    return (
        <div>
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={pokemon.sprites.front_default}
            objectFit="contain"
            width="100%"
            height="100%"
          />
        </Box>
        <Stack>
        <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'lg'}
            fontFamily={'body'}>
                <Text>
                    # <Text as="span" fontSize="lg" fontWeight="700" >{pokemon.game_indices[pokemon.game_indices.length - 1].game_index}</Text>
                </Text>
          </Heading>
          <Text
            color={'green.500'}
            textTransform={'uppercase'}
            fontWeight={700}
            fontSize={24}
            letterSpacing={1.1}>
            {pokemon.name}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'md'}
            fontFamily={'body'}>
                <Text>
                    Weight <Text as="span" fontSize="lg" fontWeight="700" >{pokemon.weight}</Text>
                </Text>
          </Heading>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'md'}
            fontFamily={'body'}>
                <Text>
                    Height <Text as="span" fontSize="lg" fontWeight="700" >{pokemon.height}</Text>
                </Text>
          </Heading>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'md'}
            fontFamily={'body'}>
                <Text>
                    Ability <Text as="span" fontSize="lg" fontWeight="700" >{pokemon.abilities[0].ability.name}</Text>
                </Text>
          </Heading>
          {/* <Text fontSize={20} color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </Text> */}
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
     
        </Stack>
      </Box>
    </Center>
        </div>
    )
}

export default Card
