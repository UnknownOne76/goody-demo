interface TitleProps {
  text: string | undefined;
  style: string;
  font?: string;
}

export const TitleComponent = ({ style, font, text }: TitleProps) => {
  return <div className={`${style} ${font}`}>{text}</div>;
};

export default TitleComponent;
