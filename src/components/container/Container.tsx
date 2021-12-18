import { HTMLAttributes } from "react";
import styles from './Container.module.css';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}