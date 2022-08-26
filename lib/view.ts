export const opacity = (color: string, opacity = 0xa0)=> color + (opacity.toString(16).padStart(2,"0"));

export const noTitle = "Reost"

export const title = (title: string)=>  noTitle + " | " + title;
