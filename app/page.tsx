"use client";
import {
  
  Container,
  
  Button,
  Grid,
  Paper,
  Text,
  Avatar,
  rem,
  Anchor,
  Tooltip,
} from "@mantine/core";
import classes from "../styles/page.module.css";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";

import { useEffect, useState } from "react";



import {
  IconAt,
  IconPhoneCall,
  IconStar,
  IconTrash,
  IconUserMinus,
  IconUserPlus,
  IconWorld,
} from "@tabler/icons-react";



interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  isFollowed: boolean;
}

export default function HomePage() {
  
  const [users, setUsers] = useState<User[]>([]);

 
   

  useEffect(() => {
    
    const fetchData = async () => {

      try{
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const usersData = await response.json();
        const updatedUsersData = usersData?.map((user:any) => ({
          ...user,
          isFollowed: false,
        }));
        setUsers(updatedUsersData);

      }catch(error){
        console.error("Error",error)

          throw new Error('Failed to fetch users!')
      }
       
    };
    fetchData()
},[])


  const onDelete = (userId:any) => {
    const updatedUsers = users.filter((user, index) => {
      return user.id !== userId;
    });

    setUsers(updatedUsers);
  };

  const onFollow = (userId:any) => {
   

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isFollowed: !user.isFollowed } : user
      )
    );
  };



  return (
   
      
        <Grid>
          {users?.map((user) => {
            return (
              <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={user.id}>
                <Paper shadow="sm" withBorder p="lg" radius={rem(10)}>
                  <div className={classes.user_avatar}>
                    <Tooltip label={user.name}>
                    <Anchor href={`https:\\${user.website}`} target="_blank">
                    <Avatar
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                      alt={`Avatar for ${user.name}`}
                      size={rem(120)}
                    />
                    </Anchor>
                    </Tooltip>
                    
                  </div>

                  <div className={classes.user_name}>
                    <Text fw={500} fz="lg">
                      {user.name}
                    </Text>
                    {user.isFollowed ? (
                      <IconStar style={{ width: rem(16) }} />
                    ) : (
                      ""
                    )}
                  </div>

                  <div className={classes.user_info_div}>
                    <div className={classes.user_info}>
                      <IconAt className={classes.tabler_icon} />

                      
                      <Anchor href={`mailto:${user.email}`} underline="hover"  target="_blank" className={classes.custom_link}>{user.email}</Anchor>

                    </div>

                    <div className={classes.user_info}>
                      <IconPhoneCall className={classes.tabler_icon} />

                      <Anchor href={`tel:${user.phone}`} underline="hover"  target="_blank" className={classes.custom_link}>{user.phone}</Anchor>
                    </div>

                    <div className={classes.user_info}>
                      <IconWorld className={classes.tabler_icon} />

                    
                      <Anchor href={`https:\\${user.website}`} underline="hover" target="_blank" className={classes.custom_link}>{user.website}</Anchor>
                    </div>
                  </div>

                  <div className={classes.buttons}>
                    <Button onClick={() => onFollow(user.id)}  variant= {user.isFollowed ? "default":""} >
                     
                      {user.isFollowed ? (
                        <>
                        <IconUserMinus style={{ width: rem(16) }}  color="black" />
                        <Text size="sm"  fw={500} pl='10px' color="black" >Unfollow</Text>
                        </>
                        
                      ) : (
                        <>
                          <IconUserPlus style={{ width: rem(16) }} />
                        <Text size="sm"  fw={500} pl='10px'>Follow</Text></>
                      
                      )}

                       
                     
                     
                    </Button>

                    <Button variant="outline" onClick={() => onDelete(user.id)}>
                      <IconTrash style={{ width: rem(16) }} />

                      <Text size="sm" c="blue"  fw={500} pl='10px'>
                        Delete
                      </Text>
                    </Button>
                  </div>
                </Paper>
              </Grid.Col>
            );
          })}
        </Grid>
    
    
  );
}




