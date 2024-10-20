import {logo,Board,Analytics,Logout,Setting}  from './../assets/MainLayoutComponent';

const headerelements =[
    {icon:logo,name:"Pro Manage",link:"/dashboard"},
  ];

const bodyelements = [
  {icon:Board,name:"Board",link:"/dashboard"},
  {icon:Analytics,name:"Analytics",link:"/analytics"},
  {icon:Setting,name:"Settings",link:"/settings"},
];

const footerelements = [
  {icon:Logout,name:"Log out",onClick:()=>{openModal()}},
];
  
export {headerelements,bodyelements,footerelements};  