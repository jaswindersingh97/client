import {logo,Board,Analytics,Logout,Setting}  from './../assets/MainLayoutComponent';
import LogoutComponent from '../components/Logout/Logout';
const headerelements =[
    {icon:logo,name:"Pro Manage",link:"/dashboard"},
  ];

const bodyelements = [
  {icon:Board,name:"Board",link:"/dashboard"},
  {icon:Analytics,name:"Analytics",link:"/analytics"},
  {icon:Setting,name:"Settings",link:"/settings"},
];

const footerelements = [
  {icon:Logout,name:"Log out",onClick:()=>{}},
];
  
export {headerelements,bodyelements,footerelements};  