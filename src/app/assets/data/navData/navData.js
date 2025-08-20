// NOTE Language Images ---

import { BiBadgeCheck, BiMessageSquareDots, BiTask } from "react-icons/bi";
import { IoMdWallet } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdAccountCircle, MdLock, MdOutlineMessage } from "react-icons/md";
import { RiLifebuoyLine } from "react-icons/ri";

import bitbucket from "../../images/brands/bitbucket.png";
import dribbble from "../../images/brands/dribbble.png";
import dropbox from "../../images/brands/dropbox.png";
import github from "../../images/brands/github.png";
import mailChimp from "../../images/brands/mail_chimp.png";
import slack from "../../images/brands/slack.png";
import productImage1 from "../../images/products/img-1.png";
import productImage2 from "../../images/products/img-2.png";
import productImage3 from "../../images/products/img-3.png";
import productImage5 from "../../images/products/img-5.png";
import productImage6 from "../../images/products/img-6.png";
import avatar1 from "../../images/users/avatar-2.jpg";
import avatar3 from "../../images/users/avatar-3.jpg";
import avatar4 from "../../images/users/avatar-6.jpg";
import avatar2 from "../../images/users/avatar-8.jpg";

import ROUTES from "@/constants/routes";

// NOTE WebApp Data ****
export const webAppsData = [
  {
    id: "github_webapp",
    appName: "Github",
    appImage: github,
  },
  {
    id: "bitbucket_webapp",
    appName: "Bitbucket",
    appImage: bitbucket,
  },
  {
    id: "dribble_webapp",
    appName: "Dribble",
    appImage: dribbble,
  },
  {
    id: "dropbox_webapp",
    appName: "Dropbox",
    appImage: dropbox,
  },
  {
    id: "mailchimp_webapp",
    appName: "Mail Chimp",
    appImage: mailChimp,
  },
  {
    id: "slack_webapp",
    appName: "Slack",
    appImage: slack,
  },
];

// NOTE MyCart Data ****
export const myCartData = [
  {
    id: "cart_1",
    productImage: productImage1,
    productName: "Branded T-Shirts",
    productQuantity: 10,
    productPrice: 32,
  },
  {
    id: "cart_2",
    productImage: productImage2,
    productName: "Bentwood Chair",
    productQuantity: 5,
    productPrice: 18,
  },
  {
    id: "cart_3",
    productImage: productImage3,
    productName: "Borosil Paper Cup",
    productQuantity: 3,
    productPrice: 250,
  },
  {
    id: "cart_4",
    productImage: productImage5,
    productName: "Gray Styled T-Shirt",
    productQuantity: 1,
    productPrice: 1250,
  },
  {
    id: "cart_5",
    productImage: productImage6,
    productName: "Stillbird Helmet",
    productQuantity: 2,
    productPrice: 495,
  },
];

// NOTE Nav Notifications Data ****
export const notificationsData = [
  {
    id: "all-notification",
    label: "All",
    content: [
      {
        id: "noti-1",
        type: "general",
        notificationText: `Your Elite author Graphic Optimization reward is ready!`,
        time: "JUST 30 SEC AGO",
        icon: <BiBadgeCheck size={15} color="#41A3DC" />,
        iconBgColor: "#DFF0FA",
      },
      {
        id: "noti-2",
        type: "user",
        username: "Angela Bernier",
        notificationText:
          "Answered to your comment on the cash flow forecast's graph 🔔.",
        time: "48 MIN AGO",
        userImage: avatar1,
      },
      {
        id: "noti-3",
        type: "general",
        notificationText:
          "You have received 20 new messages in the conversation",
        time: "2 HRS AGO",
        icon: <BiMessageSquareDots size={15} color="#F06548" />,
        iconBgColor: "#FDE8E4",
      },
      {
        id: "noti-4",
        type: "user",
        username: "Maureen Gibson",
        notificationText: "We talked about a project on linkedin.",
        time: "4 HRS AGO",
        userImage: avatar2,
      },
    ],
  },
  {
    id: "all-message-notifications",
    label: "Messages",
    content: [
      {
        id: "msg-noti-1",
        type: "user",
        username: "James Lemire",
        notificationText: "We talked about a project on linkedin.",
        time: "30 MIN AGO",
        userImage: avatar3,
      },
      {
        id: "msg-noti-2",
        type: "user",
        username: "Angela Bernier",
        notificationText:
          "Answered to your comment on the cash flow forecast's graph 🔔.",
        time: "2 HRS AGO",
        userImage: avatar1,
      },
      {
        id: "msg-noti-3",
        type: "user",
        username: "Kenneth Brown",
        notificationText: "Mentionned you in his comment on 📃 invoice #12501.",
        time: "10 HRS AGO",
        userImage: avatar4,
      },
      {
        id: "msg-noti-4",
        type: "user",
        username: "Maureen Gibson",
        notificationText: "We talked about a project on linkedin.",
        time: "3 DAYS AGO",
        userImage: avatar2,
      },
    ],
  },
  {
    id: "all-alert-notifications",
    label: "Alerts",
    content: [],
  },
];

// NOTE Nav profile data group 1 ****
export const profileDataGroup1 = [
  {
    id: "nav-profile",
    label: "Profile",
    icon: <MdAccountCircle size={16} color="#878a99" />,
    linkAddress: ROUTES.PROFILE,
  },
  {
    id: "nav-messages",
    label: "Messages",
    icon: <MdOutlineMessage size={16} color="#878a99" />,
    linkAddress: "#",
  },
  {
    id: "nav-taskboard",
    label: "Taskboard",
    icon: <BiTask size={16} color="#878a99" />,
    linkAddress: "#",
  },
  {
    id: "nav-help",
    label: "Help",
    icon: <RiLifebuoyLine size={16} color="#878a99" />,
    linkAddress: "#",
  },
];

// NOTE Nav profile data group 2 ****
export const profileDataGroup2 = [
  {
    id: "nav-balance",
    label: "Balance: ",
    subLabel: "$5971.67",
    icon: <IoMdWallet size={16} color="#878a99" />,
    linkAddress: "#",
  },
  {
    id: "nav-settings",
    label: "Settiings",
    isNew: true,
    icon: <IoSettingsOutline size={16} color="#878a99" />,
    linkAddress: "#",
  },
  {
    id: "nav-lock-screen",
    label: "Lock Screen",
    icon: <MdLock size={16} color="#878a99" />,
    linkAddress: "#",
  },
];

// PUBLIC NAVBAR LINKS
export const publicNavbarLinks = [
  {
    name: "Home",
    link: ROUTES.HOME,
    child_menu: [],
    status: true,
    product_menu_status: false,
  },
  {
    name: "About us",
    link: ROUTES.ABOUT_US,
    child_menu: [],
    status: true,
    product_menu_status: false,
  },
  {
    name: "Courses",
    link: ROUTES.COURSES,
    child_menu: ["1"],
    status: true,
    product_menu_status: false,
  },
  {
    name: "News",
    link: ROUTES.NEWS,
    child_menu: [],
    status: true,
    product_menu_status: false,
  },
  {
    name: "Careers",
    link: ROUTES.CAREERS,
    child_menu: [],
    status: true,
    product_menu_status: false,
  },
  {
    name: "Contact us",
    link: ROUTES.CONTACT_US,
    child_menu: [],
    status: true,
    product_menu_status: false,
  },
  {
    name: "Offers",
    link: ROUTES.OFFERS,
    child_menu: [],
    status: true,
    product_menu_status: false,
  },
  {
    name: "Register",
    link: "#",
    child_menu: [],
    status: true,
    product_menu_status: false,
  },
];

// Menu data
export const menuTree = [
  {
    _id: "menu-home-parent",
    name: "Home",
    link: "/",
    children: [],
  },
  {
    _id: "menu-about-us-parent",
    name: "About Us",
    link: "/about-us",
    children: [],
  },
  {
    _id: "menu-our-services-parent",
    name: "Services",
    link: "/services", // TODO need to change in to SERVICES listing page link
    children: [
      {
        _id: "menu-our-services-child-1",
        name: "Specialized Legal Consultation for Property and Ownership Disputes",
        link: "/services/specialized-legal-consultation-for-property-and-ownership-disputes",
        children: [],
      },
      {
        _id: "menu-our-services-child-2",
        name: "Mediation and Advisory Services to Minimize Litigation and Encourage Settlements",
        link: "/services/mediation-and-advisory-services-to-minimize-litigation-and-encourage-settlements",
        children: [],
      },
      {
        _id: "menu-our-services-child-3",
        name: "Legal Representation Before Courts, Judicial Bodies, and Government Authorities",
        link: "/services/legal-representation-before-courts-judicial-bodies-and-government-authorities",
        children: [],
      },
      {
        _id: "menu-our-services-child-4",
        name: "Customized Legal Training Programs for NGOs and Institutions",
        link: "/services/customized-legal-training-programs-for-ngos-and-institutions",
        children: [],
      },
      {
        _id: "menu-our-services-child-5",
        name: "Expert Legal Advice in Civil, Commercial, Family, and Criminal Law",
        link: "/services/expert-legal-advice-in-civil-commercial-family-and-criminal-law",
        children: [],
      },
      {
        _id: "menu-our-services-child-6",
        name: "Criminal Defense in Cases of Fraud, Forgery, Theft, and Related Offenses",
        link: "/services/criminal-defense-in-cases-of-fraud-forgery-theft-and-related-offenses",
        children: [],
      },
      {
        _id: "menu-our-services-child-7",
        name: "Drafting Domestic and International Contracts for Individuals and Businesses",
        link: "/services/drafting-domestic-and-international-contracts-for-individuals-and-businesses",
        children: [],
      },
      {
        _id: "menu-our-services-child-8",
        name: "Preparation of Legal Documents Including Claims, Objections, and Petitions",
        link: "/services/preparation-of-legal-documents-including-claims-objections-and-petitions",
        children: [],
      },
      {
        _id: "menu-our-services-child-9",
        name: "Consultation on Company Registration, Trademarks, and Intellectual Property",
        link: "/services/consultation-on-company-registration-trademarks-and-intellectual-property",
        children: [],
      },
      {
        _id: "menu-our-services-child-10",
        name: "Advisory on Employment Law, Contracts, and Workplace Relations",
        link: "/services/advisory-on-employment-law-contracts-and-workplace-relations",
        children: [],
      },
      {
        _id: "menu-our-services-child-11",
        name: "Services for Property Registration, Transfer, Inheritance, and Ownership Rights",
        link: "/services/services-for-property-registration-transfer-inheritance-and-ownership-rights",
        children: [],
      },
      {
        _id: "menu-our-services-child-12",
        name: "Legal Support for Returnees and Displaced Individuals",
        link: "/services/legal-support-for-returnees-and-displaced-individuals",
        children: [],
      },
    ],
  },
  {
    _id: "menu-packages",
    name: "Packages",
    link: "/packages",
    children: [],
  },
  {
    _id: "menu-contact",
    name: "Contact Us",
    link: "/contact-us",
    children: [],
  },
];
