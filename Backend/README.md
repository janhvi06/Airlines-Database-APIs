Endpoints

    For Airlines
        Post Requests
            To create/register new airline data-: "http://localhost:8080/api/airline/create"

        Get Requests
            To read all airlines database-: "http://localhost:8080/api/airline/read"
            To read airline by id-: "http://localhost:8080/api/airline/read/:id"

   
    For Passengers
        Post Requests
            To register/create new passanger data-:"http://localhost:8080/api/passenger/register"
        
        Get Requests
            Read passenger data by passenger ID-:"http://localhost:8080/api/passenger/read/:id"
            Read all passengers data-:"http://localhost:8080/api/passenger/read?page=0&size=1"
              (pageable)
        
        Delete Requests
            Delete passenger data by passenger ID-:"http://localhost:8080/api/passenger/discard/:id"
          
        Put Requests
            Update whole passenger data by passenger ID-:"http://localhost:8080/api/passenger/updatedata/:id"
        
        Patch Requests
            Update passenger's name by passenger ID-:"http://localhost:8080/api/passenger/updatename/"
