const server  = require ("./server.js");

if(process.env.NODE_ENV === "test"){
  server.listen(8000, () => {
    console.log(
      "Capstone Project Backend is running on http://localhost:8000"
    );
  });
}else{
  server.listen(8080, () => {
    console.log(
      "Capstone Project Backend is running on http://localhost:8080"
    );
  });
}