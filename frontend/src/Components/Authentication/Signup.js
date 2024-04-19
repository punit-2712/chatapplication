import { Button, FormControl, FormLabel, InputGroup, InputRightElement, Show, Toast, VStack } from '@chakra-ui/react';
import React from 'react'
import { Input } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/toast";
import { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router";

const Signup = () => {

  // useStates
  const[show,setShow]= useState(false)
  const[name,setName]=useState();
  const toast = useToast();
  const[email,setEmail]=useState();
  const[confirmpassword,setConfirmpassword]=useState();
  const[password,setPassword]=useState();
  const[pic,setPic]=useState();
  const history=useHistory();
  

  //functions 
  const handleClick=()=> setShow(!show);
  const postDetails = (pics)=>{};
  const submitHandler= async ()=>{

    if(!name || !email || !password || !confirmpassword){
        
        Toast({
            title:"Please fill all the fields",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom",
        });
        return 
    }
    if(password!==confirmpassword){  
        
        Toast({
            title:"Password does not match",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom",
        });
        return 
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
     
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    
    }
  };
  return (
    <VStack 
    spacing='5px'>



        <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
            placeholder="Enter Your Name"
            onChange={(e)=> setName(e.target.value)} />
        </FormControl>
        
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
            placeholder="Enter Your Email"
            onChange={(e)=> setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="password" isRequired>
            <FormLabel>Passoword</FormLabel>
            <InputGroup>
            <Input 
            // if show is true then it is text otherwise it is gonna bhi passwork
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e)=> setPassword(e.target.value)} />
            <InputRightElement width={"4.5rem"}>
                <button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}

                </button>
            </InputRightElement>
            </InputGroup>
            
        </FormControl>



        
        <FormControl id="Confirm password" isRequired>
            <FormLabel>Confirm Passoword</FormLabel>
            <InputGroup>
            <Input 
            // if show is true then it is text otherwise it is gonna bhi passwork
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e)=> setConfirmpassword(e.target.value)} />
            <InputRightElement width={"4.5rem"}>
                <button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}

                </button>
            </InputRightElement>
            </InputGroup>
            
        </FormControl>

         <FormControl id="pic" isRequired>
            <FormLabel>Upload your picture</FormLabel>
            <Input
            
            type='file'
            p={1.5}
            accept="image/*"
            onChange={(e)=>postDetails(e.target.files[0])}
            />
            
        </FormControl>
        <Button
        colorScheme='blue'
        width={'100%'}
        style={{marginTop: 15}}
        onClick={submitHandler}
        >
            Signup
        </Button>




    </VStack>
  );

};



  

export default Signup;
