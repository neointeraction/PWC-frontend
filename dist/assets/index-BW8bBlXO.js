const l=n=>{if(!n)return"";const s=(n.includes("T")?n.split("T")[0]:n).split("-");return s.length===3&&s[0].length===4?`${s[2]}-${s[1]}-${s[0]}`:n};export{l as f};
