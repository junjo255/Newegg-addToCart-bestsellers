# SDC (System Design Captstone) Project


Redesign and optimize an existing app to implement a highly scalable backend architecture.

<img width="967" alt="Screen Shot 2019-04-01 at 10 50 38 AM" src="https://user-images.githubusercontent.com/43450544/55337112-1199bd00-546c-11e9-8b33-e8346b1052ac.png">


![68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f75576e70495367726e4969586161614865502f67697068792e676966](https://user-images.githubusercontent.com/43450544/55968816-be352500-5c4a-11e9-9b98-3c346e056015.gif)
![68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f316d684e346b424a764e68516d6a73564c492f67697068792e676966](https://user-images.githubusercontent.com/43450544/55968817-becdbb80-5c4a-11e9-8449-a7db9e738a66.gif)


## Backend


- Node v.10.15.3 <https://nodejs.org/en/>
- Nginx v.1.15.10 <https://www.nginx.com/>
- Redis v.5.0.4 <https://redis.io/>r
- Docker v.18.09.2 <https://www.docker.com/>
- AWS ec2 <https://aws.amazon.com/ec2/>
- MongoDB v.4.0.3 <https://www.mongodb.com/>
- PostSQL v.11.2 <https://www.postgresql.org/>


## Development

### Getting Started
All necessary dependencies are stored in package.json. 

To install all dependencies:
`npm install`  

To run the client:
`npm run react-dev`

To run the server :
`npm run server-dev`



## Project Overview



- The **goal** of this project was to handle the throughput of 500 RPS and at a latency of less than 2000ms. 
- Through the steps that I took in the **final** and the **optimizations** that I made, I achieved a final metric of 1.2k RPS throughput at a 42ms latency. 
- The **key factor** guiding all of **my big decisions in this project was the use case of my component.** Thinking about the add-to-cart component, transactional integrity, and immediate consistency of data is of the highest importance, meaning if a user decides to buy, let’s say 10 of the same products, but there are only 9 items available and that is reflected in the database, the user should be notified of the limit.
- With that in mind, I generated 40 million records to emulate production level data sets.

                               ----------**3 big decisions**---------
1. **Deciding which DBMS to go with:** The very first step I took in the project was deciding which DBMS to go with. After seeding 40 million data records to mimic real life example, I've decided to compare MongoDB with PostgreSQL on reads and writes. MongoDB had a better reads time than PostgreSQL. PostgreSQL outperformed MongoDB at writes. Apparently, there's this trade-off here where MongoDB is faster at reads but PostgreSQL is a lot faster at writes. **To make my decision**, I referred back to my components use case; users are browsing far more than they are writing or replying. So I came to a conclusion to prioritize the performance of a read and go with MongoDB.

2. **Horizontally Scaling:** After dockerizing my app using **Docker** and deploying my containers to my **AWS ec2** instance, I stress tested my app using **loader.io**. It was breaking at ~190RPS. At this phase, I identified that a potential bottleneck for me was the fact that I only had one server. It was apparent that one server was handling all the stress of these load tests where thousands of requests are happening. So I decided to explore this by** horizontally scaling** using **Nginx**. I used the default **round-robin load balancing** settings and setup 3 instances. After doing more load tests, an interesting observation was made where implementing Nginx definitely allows more requests to be handled, but there was a diminishing marginal benefit for using Nginx. The throughput performance decreased by 10%.

3. **Caching:** Identified that my bottleneck now is the database. I explored the option of using **Redis** caching method. I dockerized Redis and deployed to each instance and optimized throughput performance by 300%. 


