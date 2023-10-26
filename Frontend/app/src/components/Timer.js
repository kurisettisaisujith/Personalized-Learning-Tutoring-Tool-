import  {useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import './Timer.css';


const my_array = ["https://imgs.search.brave.com/E94Unm-9nq8ifeO6sKl4r4ZiAm_UQqjqsg6uKLDL6bI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjIz/NjA3ODUwL3Bob3Rv/L3RlYWNoZXItaGVs/cGluZy1zdHVkZW50/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9dG9fTnBJdlpX/bHJaZlNYcWJUcnFs/LTBDN3dwX0ZsZXNj/YTNWY21tSnpSaz0","https://img-c.udemycdn.com/notices/web_carousel_slide/image/06bffb17-9483-429e-9145-25f046f65ad1.png","https://img-c.udemycdn.com/notices/web_carousel_slide/image/e6cc1a30-2dec-4dc5-b0f2-c5b656909d5b.jpg"];

export default function Timer() {
    let [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 200000);
  });
 
  
  if(count>my_array.length-1){
   
    setCount((count) =>0 );

  }
  
    



  
  return (
    <>
      <div className="s1">
      <div className="slideshow">
        <img src={my_array[count]} alt="" width="100%" height="300px" />
      </div>
      <div className="text-overlay">
        <h2></h2>
      </div>
    </div>
    
    </>
  );
}