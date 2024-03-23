"use client";
import cx from "clsx";
import { Container, createTheme } from "@mantine/core";
import classes from './styles/theme.module.css'

export const theme = createTheme({
  /* Put your mantine theme override here */
 
    components: {
      Container: Container.extend({
        classNames: (_, { size }) => ({
          root: cx({ [classes.responsiveContainer]: size === "responsive" }),
        }),
      }),
    },
  });
  

