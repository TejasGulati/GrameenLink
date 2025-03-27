import{c as A,r as d,L as k,j as e,m as o,d as a,T as x,U as X,P as Q,G as Z,A as C}from"./index-1dea4728.js";import{H as $,R as we,P as Me,a as ee}from"./RadarChart-880bc718.js";import{S as Ce}from"./search-97c5c7d2.js";import{P as ae,R as f,C as Se,T as S,a as b,B as I,d as z,X as L,Y as v,e as N,G as Ie,L as ke,f as j,g as te,b as Ae,c as Re}from"./BarChart-9a93a856.js";import{S as se}from"./shopping-cart-da0820e4.js";import{P as Ve,a as De}from"./PieChart-b05a9c84.js";import{R as Te}from"./refresh-cw-6b3daa2e.js";const u=A("Banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]]),re=A("Book",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20",key:"t4utmx"}]]),ie=A("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]),Pe=A("Smile",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]]),O=[{name:"Agricultural Inputs",description:"Seeds, fertilizers, tools, and technology to improve farming productivity",icon:k,impact:"Increases crop yields by 30-50% for small farmers"},{name:"Health & Wellness",description:"Essential medicines, health supplements, and personal care products",icon:$,impact:"Reduces healthcare access time from days to hours"},{name:"FMCG & Essentials",description:"Fast-moving consumer goods, groceries, and daily household necessities",icon:se,impact:"Saves 4-6 hours weekly per household in procurement time"},{name:"Rural Financial Services",description:"Micro-banking, insurance, and financial literacy tools",icon:u,impact:"Increases savings participation by 65% in served communities"},{name:"Educational Resources",description:"Learning materials, digital education tools, and skill development kits",icon:re,impact:"Improves school attendance by 40% in served areas"}],Fe=[{name:"Access Time",traditional:8,mrv:1,fullMark:10},{name:"Product Variety",traditional:3,mrv:8,fullMark:10},{name:"Affordability",traditional:4,mrv:7,fullMark:10},{name:"Income Impact",traditional:2,mrv:9,fullMark:10},{name:"Health Access",traditional:3,mrv:8,fullMark:10},{name:"Digital Inclusion",traditional:1,mrv:7,fullMark:10}],le="mobileRetailVansData";function Be(){const[s,m]=d.useState(null),[y,H]=d.useState("All"),[p,ne]=d.useState({totalVans:0,activeVans:0,entrepreneursEmpowered:0,villagesReached:0,totalSocialImpact:0,incomeGenerated:0,farmersTrained:0}),[R,K]=d.useState("grid"),[g,B]=d.useState(""),[ce,V]=d.useState(!1),[de,D]=d.useState(!1),[oe,T]=d.useState(!1),[me,G]=d.useState(!1),[w,he]=d.useState([]),[W,ue]=d.useState([]),[P,pe]=d.useState([]),[_,ge]=d.useState([]),[Ee,xe]=d.useState([]),M=["#0088FE","#00C49F","#FFBB28","#FF8042","#8884D8","#82CA9D"],fe=[{id:"MRV-001",entrepreneur:"Priya Sharma",location:"Maharashtra Rural Circuit",status:"Active",mission:"Empowering Small-Scale Farmers",socialImpact:{farmersTrained:42,additionalIncomeFacilitated:"₹75,000",sustainabilityScore:4.7,healthAccess:38,educationAccess:24},route:[{point:"Farmer Cooperative",timestamp:"09:00 AM",services:["Agricultural Inputs","Financial Literacy"]},{point:"Village Health Center",timestamp:"11:30 AM",services:["Health & Wellness","Insurance Awareness"]},{point:"Community Learning Center",timestamp:"02:00 PM",services:["Educational Resources"]}],specialties:["Agricultural Inputs","Health & Wellness"],contactNumber:"+91 9876543210",vehicleDetails:{make:"Tata Ace",model:"Transformed Retail Van",registrationNumber:"MH-12-AB-1234",lastMaintenance:"2024-03-15"},performanceMetrics:{salesThisMonth:"₹95,000",customerSatisfaction:4.8,routesCovered:15,productsDelivered:127,profitMargin:"32%",customerRetention:"85%"},benefits:{timeSaved:"150 hours/week",costReduction:"25% avg.",accessImproved:"3x more products",digitalPayments:"68% adoption"}},{id:"MRV-002",entrepreneur:"Rajesh Kumar",location:"Karnataka Agricultural Region",status:"Maintenance",mission:"Bridging Health and Education Gaps",socialImpact:{farmersTrained:35,additionalIncomeFacilitated:"₹62,000",sustainabilityScore:4.5,healthAccess:42,educationAccess:31},route:[{point:"Rural Health Clinic",timestamp:"10:15 AM",services:["Health & Wellness","Educational Resources"]},{point:"Seed Distribution Center",timestamp:"12:45 PM",services:["Agricultural Inputs"]}],specialties:["Agricultural Inputs","Educational Resources"],contactNumber:"+91 8765432109",vehicleDetails:{make:"Mahindra Bolero",model:"Community Service Van",registrationNumber:"KA-23-CD-5678",lastMaintenance:"2024-03-10"},performanceMetrics:{salesThisMonth:"₹75,000",customerSatisfaction:4.5,routesCovered:12,productsDelivered:95,profitMargin:"28%",customerRetention:"78%"},benefits:{timeSaved:"120 hours/week",costReduction:"22% avg.",accessImproved:"2.5x more products",digitalPayments:"55% adoption"}}],[r,F]=d.useState(()=>{const t=localStorage.getItem(le);return t?JSON.parse(t):fe}),[n,h]=d.useState({entrepreneurName:"",mission:"",location:"",contactNumber:"",specialties:[],vehicleMake:"",registrationNumber:""});d.useEffect(()=>{localStorage.setItem(le,JSON.stringify(r))},[r]),d.useEffect(()=>{const t={totalVans:r.length,activeVans:r.filter(i=>i.status==="Active").length,entrepreneursEmpowered:r.length,villagesReached:r.length*5,totalSocialImpact:r.reduce((i,l)=>{const c=parseFloat(l.socialImpact.additionalIncomeFacilitated.replace("₹","").replace(",",""));return i+(isNaN(c)?0:c)},0),incomeGenerated:r.reduce((i,l)=>{const c=parseFloat(l.socialImpact.additionalIncomeFacilitated.replace("₹","").replace(",",""));return i+(isNaN(c)?0:c)},0),farmersTrained:r.reduce((i,l)=>i+l.socialImpact.farmersTrained,0)};ne(t)},[r]),d.useEffect(()=>{const t=r.reduce((i,l)=>(l.specialties.forEach(c=>{i[c]=(i[c]||0)+1}),i),{});he(Object.entries(t).map(([i,l])=>({name:i,value:l,percent:r.length?l/r.length:0,...O.find(c=>c.name===i)}))),ue(r.map(i=>{const l=parseFloat(i.performanceMetrics.salesThisMonth.replace("₹","").replace(",","")),c=i.performanceMetrics.customerSatisfaction*20,q=i.performanceMetrics.productsDelivered,J=parseFloat(i.performanceMetrics.profitMargin.replace("%",""));return{name:i.id,sales:isNaN(l)?0:l,satisfaction:isNaN(c)?0:c,products:isNaN(q)?0:q,profit:isNaN(J)?0:J}})),pe([{name:"Farmers Trained",value:r.reduce((i,l)=>i+l.socialImpact.farmersTrained,0),icon:k},{name:"Income Generated",value:r.reduce((i,l)=>{const c=parseFloat(l.socialImpact.additionalIncomeFacilitated.replace("₹","").replace(",",""));return i+(isNaN(c)?0:c)},0),icon:u},{name:"Health Access",value:r.reduce((i,l)=>i+l.socialImpact.healthAccess,0),icon:$},{name:"Education Access",value:r.reduce((i,l)=>i+l.socialImpact.educationAccess,0),icon:re}]),ge(r.map(i=>{const l=parseFloat(i.performanceMetrics.salesThisMonth.replace("₹","").replace(",","")),c=parseFloat(i.socialImpact.additionalIncomeFacilitated.replace("₹","").replace(",",""));return{name:i.id,revenue:isNaN(l)?0:l,impact:isNaN(c)?0:c,profit:parseFloat(i.performanceMetrics.profitMargin.replace("%",""))||0}})),xe([{name:"Time Saved",value:r.reduce((i,l)=>i+parseInt(l.benefits.timeSaved),0)},{name:"Cost Reduction",value:r.reduce((i,l)=>i+parseInt(l.benefits.costReduction),0)},{name:"Product Access",value:r.reduce((i,l)=>i+parseFloat(l.benefits.accessImproved),0)},{name:"Digital Inclusion",value:r.reduce((i,l)=>i+parseInt(l.benefits.digitalPayments),0)}])},[r]);const E=d.useMemo(()=>{let t=r;return y!=="All"&&(t=t.filter(i=>i.status===y)),g&&(t=t.filter(i=>i.entrepreneur.toLowerCase().includes(g.toLowerCase())||i.location.toLowerCase().includes(g.toLowerCase()))),t},[r,y,g]),be=()=>{if(!n.entrepreneurName||!n.location||!n.contactNumber){alert("Please fill in all required fields");return}const t={id:`MRV-${r.length+1}`,entrepreneur:n.entrepreneurName,location:n.location,status:"Active",mission:n.mission||"Empowering Rural Communities",socialImpact:{farmersTrained:Math.floor(Math.random()*50),additionalIncomeFacilitated:`₹${Math.floor(Math.random()*5e4)+5e4}`,sustainabilityScore:+(Math.random()*5).toFixed(1),healthAccess:Math.floor(Math.random()*50),educationAccess:Math.floor(Math.random()*40)},route:[{point:n.location,timestamp:new Date().toLocaleTimeString(),services:n.specialties}],specialties:n.specialties,contactNumber:n.contactNumber,vehicleDetails:{make:n.vehicleMake,model:"Community Service Van",registrationNumber:n.registrationNumber,lastMaintenance:new Date().toISOString().split("T")[0]},performanceMetrics:{salesThisMonth:`₹${Math.floor(Math.random()*5e4)+5e4}`,customerSatisfaction:+(Math.random()*5).toFixed(1),routesCovered:Math.floor(Math.random()*15)+5,productsDelivered:Math.floor(Math.random()*100)+50,profitMargin:`${Math.floor(Math.random()*15)+20}%`,customerRetention:`${Math.floor(Math.random()*20)+70}%`},benefits:{timeSaved:`${Math.floor(Math.random()*100)+50} hours/week`,costReduction:`${Math.floor(Math.random()*15)+15}% avg.`,accessImproved:`${(Math.random()*3+2).toFixed(1)}x more products`,digitalPayments:`${Math.floor(Math.random()*30)+50}% adoption`}};F([...r,t]),V(!1),h({entrepreneurName:"",mission:"",location:"",contactNumber:"",specialties:[],vehicleMake:"",registrationNumber:""})},U=t=>{window.confirm("Are you sure you want to delete this van?")&&F(r.filter(l=>l.id!==t))},Y=t=>{m(t),T(!0)},ve=()=>s?e(o.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:a(o.div,{initial:{scale:.9},animate:{scale:1},exit:{scale:.9},className:"bg-white rounded-xl p-12 w-full max-w-4xl overflow-y-auto max-h-[90vh]",children:[a("div",{className:"flex justify-between items-start mb-8",children:[a("div",{children:[a("h2",{className:"text-3xl font-bold text-gray-800 flex items-center",children:[e(x,{className:"mr-4 text-blue-600"}),s.entrepreneur,"'s Mobile Retail Van"]}),e("p",{className:"text-xl text-gray-600 mt-2",children:s.mission})]}),e("button",{onClick:()=>D(!1),className:"text-gray-500 hover:text-gray-800",children:"Close"})]}),a("div",{className:"grid md:grid-cols-3 gap-6",children:[a("div",{className:"bg-blue-50 rounded-xl p-6",children:[e("h3",{className:"text-xl font-semibold mb-4 text-blue-800",children:"Van Specifications"}),a("div",{className:"space-y-3",children:[a("div",{children:[e("strong",{children:"Make:"})," ",s.vehicleDetails.make]}),a("div",{children:[e("strong",{children:"Model:"})," ",s.vehicleDetails.model]}),a("div",{children:[e("strong",{children:"Reg. Number:"})," ",s.vehicleDetails.registrationNumber]}),a("div",{children:[e("strong",{children:"Last Maintained:"})," ",s.vehicleDetails.lastMaintenance]})]})]}),a("div",{className:"bg-green-50 rounded-xl p-6",children:[e("h3",{className:"text-xl font-semibold mb-4 text-green-800",children:"Social Impact"}),a("div",{className:"space-y-3",children:[a("div",{children:[e("strong",{children:"Farmers Trained:"})," ",s.socialImpact.farmersTrained]}),a("div",{children:[e("strong",{children:"Additional Income:"})," ",s.socialImpact.additionalIncomeFacilitated]}),a("div",{children:[e("strong",{children:"Health Services Provided:"})," ",s.socialImpact.healthAccess]}),a("div",{children:[e("strong",{children:"Educational Services:"})," ",s.socialImpact.educationAccess]})]})]}),a("div",{className:"bg-purple-50 rounded-xl p-6",children:[e("h3",{className:"text-xl font-semibold mb-4 text-purple-800",children:"Performance"}),a("div",{className:"space-y-3",children:[a("div",{children:[e("strong",{children:"Monthly Sales:"})," ",s.performanceMetrics.salesThisMonth]}),a("div",{children:[e("strong",{children:"Profit Margin:"})," ",s.performanceMetrics.profitMargin]}),a("div",{children:[e("strong",{children:"Customer Satisfaction:"})," ",s.performanceMetrics.customerSatisfaction,"/5"]}),a("div",{children:[e("strong",{children:"Customer Retention:"})," ",s.performanceMetrics.customerRetention]})]})]})]}),a("div",{className:"mt-8 bg-yellow-50 rounded-xl p-6",children:[e("h3",{className:"text-xl font-semibold mb-4 text-yellow-800",children:"Community Benefits"}),a("div",{className:"grid md:grid-cols-4 gap-4",children:[a("div",{className:"bg-white rounded-lg p-4 shadow-sm",children:[a("div",{className:"flex items-center mb-2",children:[e(Te,{className:"text-blue-600 mr-2",size:18}),e("strong",{children:"Time Saved"})]}),e("div",{children:s.benefits.timeSaved})]}),a("div",{className:"bg-white rounded-lg p-4 shadow-sm",children:[a("div",{className:"flex items-center mb-2",children:[e(u,{className:"text-green-600 mr-2",size:18}),e("strong",{children:"Cost Reduction"})]}),e("div",{children:s.benefits.costReduction})]}),a("div",{className:"bg-white rounded-lg p-4 shadow-sm",children:[a("div",{className:"flex items-center mb-2",children:[e(Q,{className:"text-purple-600 mr-2",size:18}),e("strong",{children:"Product Access"})]}),e("div",{children:s.benefits.accessImproved})]}),a("div",{className:"bg-white rounded-lg p-4 shadow-sm",children:[a("div",{className:"flex items-center mb-2",children:[e(Z,{className:"text-teal-600 mr-2",size:18}),e("strong",{children:"Digital Inclusion"})]}),e("div",{children:s.benefits.digitalPayments})]})]})]}),a("div",{className:"mt-8 bg-gray-50 rounded-xl p-6",children:[e("h3",{className:"text-xl font-semibold mb-4 text-gray-800",children:"Today's Route"}),e("div",{className:"grid md:grid-cols-3 gap-4",children:s.route.map((t,i)=>a("div",{className:"bg-white rounded-lg p-4 shadow-md border",children:[a("div",{className:"flex justify-between items-center mb-2",children:[e("strong",{children:t.point}),e("span",{className:"text-sm text-gray-600",children:t.timestamp})]}),a("div",{className:"text-sm text-gray-700",children:[e("strong",{children:"Services:"}),e("ul",{className:"list-disc list-inside",children:t.services.map((l,c)=>e("li",{children:l},c))})]})]},i))})]})]})}):null,Ne=()=>R==="grid"?e("div",{className:"grid md:grid-cols-3 gap-6",children:E.map(t=>a(o.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.3},className:"bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all relative group",onClick:()=>{m(t),D(!0)},children:[a("div",{className:"absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10",children:[e("button",{onClick:i=>{i.stopPropagation(),Y(t)},className:"bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200",children:e(j,{size:16})}),e("button",{onClick:i=>{i.stopPropagation(),U(t.id)},className:"bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200",children:e(te,{size:16})})]}),a("div",{className:"flex justify-between items-center mb-4",children:[e("h3",{className:"text-xl font-semibold",children:t.entrepreneur}),e("span",{className:`
                  px-3 py-1 rounded-full text-xs
                  ${t.status==="Active"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}
                `,children:t.status})]}),a("div",{className:"space-y-2",children:[a("div",{children:[e("strong",{children:"Location:"})," ",t.location]}),a("div",{children:[e("strong",{children:"Mission:"})," ",t.mission]}),a("div",{className:"flex items-center",children:[e(u,{className:"mr-2 text-green-600",size:16}),e("strong",{children:"Impact:"})," ",t.socialImpact.additionalIncomeFacilitated]}),a("div",{className:"flex items-center",children:[e(Pe,{className:"mr-2 text-blue-600",size:16}),e("strong",{children:"Satisfaction:"})," ",t.performanceMetrics.customerSatisfaction,"/5"]}),a("div",{className:"flex justify-between items-center mt-4",children:[e("div",{className:"w-full bg-gray-200 rounded-full h-2.5",children:e("div",{className:"bg-blue-600 h-2.5 rounded-full",style:{width:`${Math.min(t.performanceMetrics.productsDelivered,100)}%`}})}),a("span",{className:"ml-2 text-sm text-gray-600",children:[Math.min(t.performanceMetrics.productsDelivered,100),"%"]})]})]})]},t.id))}):a("table",{className:"w-full bg-white rounded-xl shadow-lg",children:[e("thead",{children:a("tr",{children:[e("th",{className:"p-4 text-left",children:"Entrepreneur"}),e("th",{className:"p-4 text-left",children:"Location"}),e("th",{className:"p-4 text-left",children:"Status"}),e("th",{className:"p-4 text-left",children:"Impact"}),e("th",{className:"p-4 text-left",children:"Revenue"}),e("th",{className:"p-4 text-left",children:"Actions"})]})}),e("tbody",{children:E.map(t=>a("tr",{className:"border-t hover:bg-gray-50 cursor-pointer",onClick:()=>{m(t),D(!0)},children:[e("td",{className:"p-4",children:t.entrepreneur}),e("td",{className:"p-4",children:t.location}),e("td",{className:"p-4",children:e("span",{className:`
                    px-3 py-1 rounded-full text-xs
                    ${t.status==="Active"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}
                  `,children:t.status})}),e("td",{className:"p-4",children:t.socialImpact.additionalIncomeFacilitated}),e("td",{className:"p-4",children:t.performanceMetrics.salesThisMonth}),a("td",{className:"p-4 flex space-x-2",children:[e("button",{onClick:i=>{i.stopPropagation(),Y(t)},className:"bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200",children:e(j,{size:16})}),e("button",{onClick:i=>{i.stopPropagation(),U(t.id)},className:"bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200",children:e(te,{size:16})})]})]},t.id))})]}),ye=()=>e(o.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:a(o.div,{initial:{scale:.9},animate:{scale:1},exit:{scale:.9},className:"bg-white rounded-xl p-12 w-full max-w-4xl",children:[a("div",{className:"flex justify-between items-start mb-8",children:[a("div",{children:[a("h2",{className:"text-3xl font-bold text-gray-800 flex items-center",children:[e(ie,{className:"mr-4 text-blue-600"}),"Why Mobile Retail Vans?"]}),e("p",{className:"text-xl text-gray-600 mt-2",children:"Transforming rural economies through innovative distribution"})]}),e("button",{onClick:()=>G(!1),className:"text-gray-500 hover:text-gray-800",children:"Close"})]}),a("div",{className:"grid md:grid-cols-2 gap-8",children:[a("div",{children:[e("h3",{className:"text-xl font-semibold mb-4 text-blue-800",children:"Key Advantages"}),a("ul",{className:"space-y-4",children:[a("li",{className:"flex items-start",children:[e("div",{className:"bg-blue-100 p-2 rounded-full mr-4",children:e(x,{className:"text-blue-600",size:20})}),a("div",{children:[e("strong",{children:"Last-Mile Connectivity:"})," Reaches remote areas traditional retail can't"]})]}),a("li",{className:"flex items-start",children:[e("div",{className:"bg-green-100 p-2 rounded-full mr-4",children:e(u,{className:"text-green-600",size:20})}),a("div",{children:[e("strong",{children:"Economic Empowerment:"})," Creates rural entrepreneurs with 30-50% higher earnings"]})]}),a("li",{className:"flex items-start",children:[e("div",{className:"bg-purple-100 p-2 rounded-full mr-4",children:e($,{className:"text-purple-600",size:20})}),a("div",{children:[e("strong",{children:"Health & Education:"})," Delivers essential services to underserved communities"]})]}),a("li",{className:"flex items-start",children:[e("div",{className:"bg-yellow-100 p-2 rounded-full mr-4",children:e(k,{className:"text-yellow-600",size:20})}),a("div",{children:[e("strong",{children:"Sustainable Model:"})," Combines profitability with social impact"]})]})]})]}),a("div",{children:[e("h3",{className:"text-xl font-semibold mb-4 text-blue-800",children:"Impact Comparison"}),e("div",{className:"h-64",children:e(f,{width:"100%",height:"100%",children:a(we,{cx:"50%",cy:"50%",outerRadius:"80%",data:Fe,children:[e(Me,{}),e(Ae,{dataKey:"name"}),e(Re,{angle:30,domain:[0,10]}),e(ee,{name:"Traditional Retail",dataKey:"traditional",stroke:"#8884d8",fill:"#8884d8",fillOpacity:.6}),e(ee,{name:"Mobile Retail Vans",dataKey:"mrv",stroke:"#82ca9d",fill:"#82ca9d",fillOpacity:.6}),e(b,{})]})})})]})]}),a("div",{className:"mt-8 bg-blue-50 rounded-xl p-6",children:[e("h3",{className:"text-xl font-semibold mb-4 text-blue-800",children:"Rural Transformation Metrics"}),a("div",{className:"grid md:grid-cols-3 gap-4",children:[a("div",{className:"bg-white rounded-lg p-4 shadow-sm",children:[e("div",{className:"text-2xl font-bold text-blue-600 mb-2",children:"3-5x"}),e("div",{children:"Increase in product accessibility"})]}),a("div",{className:"bg-white rounded-lg p-4 shadow-sm",children:[e("div",{className:"text-2xl font-bold text-green-600 mb-2",children:"25-40%"}),e("div",{children:"Reduction in consumer prices"})]}),a("div",{className:"bg-white rounded-lg p-4 shadow-sm",children:[e("div",{className:"text-2xl font-bold text-purple-600 mb-2",children:"60-80%"}),e("div",{children:"Of rural households served regularly"})]})]})]})]})});return e(o.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},className:"bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-8",children:a("div",{className:"container mx-auto mt-20",children:[a(o.div,{initial:{y:-50,opacity:0},animate:{y:0,opacity:1},transition:{duration:.5},className:"flex justify-between items-center mb-8",children:[a("div",{children:[a("h1",{className:"text-4xl font-bold text-gray-800 flex items-center",children:[e(x,{className:"mr-4 text-blue-600"})," Mobile Retail Vans"]}),e("p",{className:"text-gray-600 mt-2",children:"Bridging the rural-urban divide through mobile commerce"})]}),a("div",{className:"flex space-x-4",children:[a("div",{className:"relative",children:[e("input",{type:"text",placeholder:"Search vans...",value:g,onChange:t=>B(t.target.value),className:"pl-10 pr-4 py-2 border rounded-full w-64"}),e(Ce,{className:"absolute left-3 top-3 text-gray-400",size:20})]}),a(o.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>V(!0),className:"bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition flex items-center",children:[e(ae,{className:"mr-2"})," Add New Van"]}),a(o.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>G(!0),className:"bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition flex items-center",children:[e(ie,{className:"mr-2"})," Why MRVs?"]})]})]}),a(o.div,{initial:{y:50,opacity:0},animate:{y:0,opacity:1},transition:{duration:.5,delay:.2},className:"grid md:grid-cols-5 gap-6 mb-8 w-full",children:[a("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[a("div",{className:"flex items-center mb-4",children:[e(x,{className:"text-blue-600 mr-3"}),e("h3",{className:"text-xl font-semibold",children:"Total Vans"})]}),e("div",{className:"text-4xl font-bold text-gray-800",children:p.totalVans})]}),a("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[a("div",{className:"flex items-center mb-4",children:[e(X,{className:"text-green-600 mr-3"}),e("h3",{className:"text-xl font-semibold",children:"Active Vans"})]}),e("div",{className:"text-4xl font-bold text-gray-800",children:p.activeVans})]}),a("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[a("div",{className:"flex items-center mb-4",children:[e(se,{className:"text-purple-600 mr-3"}),e("h3",{className:"text-xl font-semibold",children:"Villages Reached"})]}),e("div",{className:"text-4xl font-bold text-purple-800",children:p.villagesReached})]}),a("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[a("div",{className:"flex items-center mb-4",children:[e(u,{className:"text-yellow-600 mr-3"}),e("h3",{className:"text-xl font-semibold",children:"Income Generated"})]}),a("div",{className:"text-4xl font-bold text-green-800",children:["₹",p.incomeGenerated.toLocaleString()]})]}),a("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[a("div",{className:"flex items-center mb-4",children:[e(k,{className:"text-teal-600 mr-3"}),e("h3",{className:"text-xl font-semibold",children:"Farmers Trained"})]}),e("div",{className:"text-4xl font-bold text-teal-800",children:p.farmersTrained})]})]}),a(o.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:.6},className:"grid md:grid-cols-2 gap-8 mb-8",children:[a("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[a("h3",{className:"text-xl font-semibold mb-4 flex items-center",children:[e(Q,{className:"mr-2 text-blue-600"})," Product Distribution"]}),w.length>0?e("div",{className:"h-64",children:e(f,{width:"100%",height:"100%",children:a(Ve,{children:[e(De,{data:w,cx:"50%",cy:"50%",labelLine:!1,label:({name:t,percent:i})=>`${t}: ${(i*100).toFixed(0)}%`,outerRadius:80,fill:"#8884d8",dataKey:"value",children:w.map((t,i)=>e(Se,{fill:M[i%M.length]},`cell-${i}`))}),e(S,{formatter:(t,i,l)=>[t,`${i}: ${(l.payload.percent*100).toFixed(1)}%`]}),e(b,{layout:"horizontal",verticalAlign:"bottom",align:"center"})]})})}):e("div",{className:"flex items-center justify-center h-64 text-gray-500",children:"No product distribution data available"}),e("div",{className:"mt-4 grid grid-cols-2 gap-2",children:w.map((t,i)=>a("div",{className:"flex items-center text-sm",children:[e("div",{className:"w-3 h-3 rounded-full mr-2",style:{backgroundColor:M[i%M.length]}}),a("span",{className:"truncate",children:[t.name,":"]}),e("span",{className:"font-medium ml-1",children:t.impact})]},i))})]}),a("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[a("h3",{className:"text-xl font-semibold mb-4 flex items-center",children:[e(I,{className:"mr-2 text-green-600"})," Van Performance"]}),W.length>0?e("div",{className:"h-64",children:e(f,{width:"100%",height:"100%",children:a(I,{data:W,children:[e(z,{strokeDasharray:"3 3"}),e(L,{dataKey:"name"}),e(v,{yAxisId:"left",orientation:"left"}),e(v,{yAxisId:"right",orientation:"right",domain:[0,100]}),e(S,{}),e(b,{}),e(N,{yAxisId:"left",dataKey:"sales",name:"Sales (₹)",fill:"#8884d8"}),e(N,{yAxisId:"right",dataKey:"profit",name:"Profit Margin (%)",fill:"#82ca9d"})]})})}):e("div",{className:"flex items-center justify-center h-64 text-gray-500",children:"No performance data available"}),a("div",{className:"mt-4 text-sm text-gray-600",children:[e("strong",{children:"Key Insight:"})," Mobile retail vans achieve 25-35% profit margins while creating social impact"]})]}),a("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[a("h3",{className:"text-xl font-semibold mb-4 flex items-center",children:[e(X,{className:"mr-2 text-purple-600"})," Social Impact"]}),P.length>0?e("div",{className:"h-64",children:e(f,{width:"100%",height:"100%",children:a(I,{data:P,children:[e(z,{strokeDasharray:"3 3"}),e(L,{dataKey:"name"}),e(v,{}),e(S,{}),e(b,{}),e(N,{dataKey:"value",fill:"#8884d8"})]})})}):e("div",{className:"flex items-center justify-center h-64 text-gray-500",children:"No social impact data available"}),e("div",{className:"mt-4 grid grid-cols-2 gap-2",children:P.map((t,i)=>a("div",{className:"flex items-center text-sm",children:[e(t.icon,{className:"mr-2",size:16}),a("span",{children:[t.name,":"]}),a("span",{className:"font-medium ml-1",children:[t.name.includes("Income")?"₹":"",t.value.toLocaleString()]})]},i))})]}),a("div",{className:"bg-white rounded-xl shadow-lg p-6",children:[a("h3",{className:"text-xl font-semibold mb-4 flex items-center",children:[e(Z,{className:"mr-2 text-green-600"})," Revenue vs Social Impact"]}),_.length>0?e("div",{className:"h-64",children:e(f,{width:"100%",height:"100%",children:a(I,{data:_,children:[e(z,{strokeDasharray:"3 3"}),e(L,{dataKey:"name"}),e(v,{yAxisId:"left",orientation:"left"}),e(v,{yAxisId:"right",orientation:"right"}),e(S,{}),e(b,{}),e(N,{yAxisId:"left",dataKey:"revenue",name:"Revenue (₹)",fill:"#0088FE"}),e(N,{yAxisId:"right",dataKey:"impact",name:"Social Impact (₹)",fill:"#00C49F"})]})})}):e("div",{className:"flex items-center justify-center h-64 text-gray-500",children:"No revenue data available"}),a("div",{className:"mt-4 text-sm text-gray-600",children:[e("strong",{children:"Key Insight:"})," Every ₹1 in revenue generates ₹0.60-0.80 in community impact"]})]})]}),a(o.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,delay:.4},className:"bg-white rounded-xl shadow-lg p-6 mb-8 min-h-[600px]",children:[a("div",{className:"flex justify-between items-center mb-6",children:[e("h2",{className:"text-2xl font-semibold text-gray-800",children:"Mobile Retail Vans"}),a("div",{className:"flex space-x-4",children:[e("div",{className:"flex space-x-2 mr-4",children:["All","Active","Maintenance"].map(t=>e("button",{className:`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${y===t?"bg-blue-600 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200"}
                    `,onClick:()=>H(t),children:t},t))}),a("div",{className:"flex space-x-2",children:[e("button",{onClick:()=>K("grid"),className:`
                    p-2 rounded-full
                    ${R==="grid"?"bg-blue-100 text-blue-600":"hover:bg-gray-100"}
                  `,children:e(Ie,{size:20})}),e("button",{onClick:()=>K("list"),className:`
                    p-2 rounded-full
                    ${R==="list"?"bg-blue-100 text-blue-600":"hover:bg-gray-100"}
                  `,children:e(ke,{size:20})})]})]})]}),E.length>0?Ne():a("div",{className:"flex flex-col items-center justify-center h-64 text-gray-500",children:[e(x,{size:48,className:"mb-4"}),e("p",{children:"No vans match your search criteria"}),e("button",{onClick:()=>{H("All"),B("")},className:"mt-4 text-blue-600 hover:underline",children:"Reset filters"})]})]}),e(C,{children:ce&&e(o.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:a(o.div,{initial:{scale:.9},animate:{scale:1},exit:{scale:.9},className:"bg-white rounded-xl p-12 mt-12 w-full max-w-lg",children:[a("h2",{className:"text-2xl font-bold mb-6 flex items-center",children:[e(ae,{className:"mr-2 text-blue-600"})," Add New Mobile Retail Van"]}),a("div",{className:"space-y-4",children:[e("input",{type:"text",placeholder:"Entrepreneur Name",value:n.entrepreneurName,onChange:t=>h({...n,entrepreneurName:t.target.value}),className:"w-full p-2 border rounded-lg"}),e("input",{type:"text",placeholder:"Contact Number",value:n.contactNumber,onChange:t=>h({...n,contactNumber:t.target.value}),className:"w-full p-2 border rounded-lg"}),e("input",{type:"text",placeholder:"Van Location",value:n.location,onChange:t=>h({...n,location:t.target.value}),className:"w-full p-2 border rounded-lg"}),e("input",{type:"text",placeholder:"Mission Statement",value:n.mission,onChange:t=>h({...n,mission:t.target.value}),className:"w-full p-2 border rounded-lg"}),e("input",{type:"text",placeholder:"Vehicle Make",value:n.vehicleMake,onChange:t=>h({...n,vehicleMake:t.target.value}),className:"w-full p-2 border rounded-lg"}),e("input",{type:"text",placeholder:"Registration Number",value:n.registrationNumber,onChange:t=>h({...n,registrationNumber:t.target.value}),className:"w-full p-2 border rounded-lg"}),a("div",{children:[e("label",{className:"block mb-2",children:"Van Specialties"}),e("div",{className:"flex flex-wrap gap-2",children:O.map(t=>a("button",{type:"button",onClick:()=>{const i=n.specialties;h({...n,specialties:i.includes(t.name)?i.filter(l=>l!==t.name):[...i,t.name]})},className:`
                            px-3 py-1 rounded-full text-sm flex items-center
                            ${n.specialties.includes(t.name)?"bg-blue-600 text-white":"bg-gray-200 text-gray-700"}
                          `,children:[e(t.icon,{className:"mr-2",size:16}),t.name]},t.name))})]}),a("div",{className:"flex justify-end space-x-4",children:[e("button",{onClick:()=>V(!1),className:"px-4 py-2 border rounded-full",children:"Cancel"}),e("button",{onClick:be,className:"bg-blue-600 text-white px-4 py-2 rounded-full",children:"Add Van"})]})]})]})})}),e(C,{children:oe&&s&&e(o.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:a(o.div,{initial:{scale:.9},animate:{scale:1},exit:{scale:.9},className:"bg-white rounded-xl p-12 mt-12 w-full max-w-lg",children:[a("h2",{className:"text-2xl font-bold mb-6 flex items-center",children:[e(j,{className:"mr-2 text-blue-600"})," Edit Mobile Retail Van"]}),a("div",{className:"space-y-4",children:[e("input",{type:"text",placeholder:"Entrepreneur Name",value:s.entrepreneur,onChange:t=>m({...s,entrepreneur:t.target.value}),className:"w-full p-2 border rounded-lg"}),e("input",{type:"text",placeholder:"Contact Number",value:s.contactNumber,onChange:t=>m({...s,contactNumber:t.target.value}),className:"w-full p-2 border rounded-lg"}),e("input",{type:"text",placeholder:"Van Location",value:s.location,onChange:t=>m({...s,location:t.target.value}),className:"w-full p-2 border rounded-lg"}),e("input",{type:"text",placeholder:"Mission Statement",value:s.mission,onChange:t=>m({...s,mission:t.target.value}),className:"w-full p-2 border rounded-lg"}),e("input",{type:"text",placeholder:"Vehicle Make",value:s.vehicleDetails.make,onChange:t=>m({...s,vehicleDetails:{...s.vehicleDetails,make:t.target.value}}),className:"w-full p-2 border rounded-lg"}),e("input",{type:"text",placeholder:"Registration Number",value:s.vehicleDetails.registrationNumber,onChange:t=>m({...s,vehicleDetails:{...s.vehicleDetails,registrationNumber:t.target.value}}),className:"w-full p-2 border rounded-lg"}),a("div",{children:[e("label",{className:"block mb-2",children:"Van Specialties"}),e("div",{className:"flex flex-wrap gap-2",children:O.map(t=>a("button",{type:"button",onClick:()=>{const i=s.specialties;m({...s,specialties:i.includes(t.name)?i.filter(l=>l!==t.name):[...i,t.name]})},className:`
                            px-3 py-1 rounded-full text-sm flex items-center
                            ${s.specialties.includes(t.name)?"bg-blue-600 text-white":"bg-gray-200 text-gray-700"}
                          `,children:[e(t.icon,{className:"mr-2",size:16}),t.name]},t.name))})]}),a("div",{className:"flex justify-end space-x-4",children:[e("button",{onClick:()=>T(!1),className:"px-4 py-2 border rounded-full",children:"Cancel"}),e("button",{onClick:()=>{const t=r.map(i=>i.id===s.id?s:i);F(t),T(!1)},className:"bg-blue-600 text-white px-4 py-2 rounded-full",children:"Save Changes"})]})]})]})})}),e(C,{children:de&&ve()}),e(C,{children:me&&ye()})]})})}export{Be as default};
