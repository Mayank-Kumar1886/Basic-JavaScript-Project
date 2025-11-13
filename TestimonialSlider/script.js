const data = [
  {
    "image": "https://randomuser.me/api/portraits/men/1.jpg",
    "testimonial": "This website helped me learn JavaScript from scratch. Highly recommended!",
    "author": "John Doe"
  },
  {
    "image": "https://randomuser.me/api/portraits/women/2.jpg",
    "testimonial": "The tutorials are so easy to follow. I built my first project in a week!",
    "author": "Jane Smith"
  },
  {
    "image": "https://randomuser.me/api/portraits/men/3.jpg",
    "testimonial": "Amazing platform for web developers. I learned more here than in class.",
    "author": "Alex Johnson"
  },
  {
    "image": "https://randomuser.me/api/portraits/women/4.jpg",
    "testimonial": "I love the way everything is explained clearly. Perfect for beginners!",
    "author": "Emily Davis"
  },
  {
    "image": "https://randomuser.me/api/portraits/men/5.jpg",
    "testimonial": "Thanks to this site, I got my first freelance client!",
    "author": "Michael Lee"
  },
  {
    "image": "https://randomuser.me/api/portraits/women/6.jpg",
    "testimonial": "Well structured and beginner-friendly. Learned so much!",
    "author": "Sophia Wilson"
  },
  {
    "image": "https://randomuser.me/api/portraits/men/7.jpg",
    "testimonial": "Clear explanations and great examples. A must-visit site for devs.",
    "author": "David Martinez"
  },
  {
    "image": "https://randomuser.me/api/portraits/women/8.jpg",
    "testimonial": "The projects here are so fun and useful to build.",
    "author": "Olivia Brown"
  },
  {
    "image": "https://randomuser.me/api/portraits/men/9.jpg",
    "testimonial": "Helped me crack my front-end developer interview. Thank you!",
    "author": "Chris Taylor"
  },
  {
    "image": "https://randomuser.me/api/portraits/women/10.jpg",
    "testimonial": "I now understand HTML and CSS completely. So grateful.",
    "author": "Ava Anderson"
  },
  {
    "image": "https://randomuser.me/api/portraits/men/11.jpg",
    "testimonial": "Simple and clean layout with real-world examples.",
    "author": "Brian Scott"
  },
  {
    "image": "https://randomuser.me/api/portraits/women/12.jpg",
    "testimonial": "Fantastic experience! Learned ReactJS from this site.",
    "author": "Mia Thompson"
  },
  {
    "image": "https://randomuser.me/api/portraits/men/13.jpg",
    "testimonial": "Great for learning backend with Node.js and Express.",
    "author": "Daniel White"
  },
  {
    "image": "https://randomuser.me/api/portraits/women/14.jpg",
    "testimonial": "Projects, quizzes, and explanations are top-notch!",
    "author": "Chloe Harris"
  },
  {
    "image": "https://randomuser.me/api/portraits/men/15.jpg",
    "testimonial": "Love how practical everything is. Not just theory.",
    "author": "Ethan Lewis"
  },
  {
    "image": "https://randomuser.me/api/portraits/women/16.jpg",
    "testimonial": "This site made me fall in love with coding again!",
    "author": "Grace Walker"
  },
  {
    "image": "https://randomuser.me/api/portraits/men/17.jpg",
    "testimonial": "Every JavaScript concept is explained with clarity.",
    "author": "Liam Hall"
  },
  {
    "image": "https://randomuser.me/api/portraits/women/18.jpg",
    "testimonial": "I improved my portfolio thanks to these project ideas.",
    "author": "Ella Young"
  },
  {
    "image": "https://randomuser.me/api/portraits/men/19.jpg",
    "testimonial": "A complete web dev journey packed in one place.",
    "author": "Matthew King"
  },
  {
    "image": "https://randomuser.me/api/portraits/women/20.jpg",
    "testimonial": "I recommend this to every aspiring web developer!",
    "author": "Zoe Wright"
  }
]

const image = document.getElementById("image");
const testimonialText = document.querySelector(".testimonials h3");
const author = document.querySelector(".author p");

let currentIndex = 0;

const showTestimonial = (index)=>{
    const item = data[index];
    image.src = item.image;
    testimonialText.innerText = item.testimonial;
    author.innerText = item.author;
}
showTestimonial(currentIndex);

setInterval(()=>{
    currentIndex++;
    if(currentIndex >= data.length){
        currentIndex =0;
    }
    showTestimonial(currentIndex);
},10000)