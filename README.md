# SDC (System Design Captstone) Project

------------


Redesign and optimize an existing app to implement a highly scalable backend architecture.


## Backend

------------
- Node, Express
- **DBMS**: MongoDB (non-relational), PostgreSQL (relational), & Redis (caching)
- **Platforms**: Nginx (load-balancing), AWS ec2 (deployment service), & Docker (containerization)


## Project Overview

------------

- The **goal** of this project was to handle the throughput of 1000 RPS and at a latency of less than 2000ms. 
- Through the steps that I took in the **final** and the **optimizations **that I made, I achieved a final metric of 1.5k RPS throughput at a 42ms latency. 
- The **key factor** guiding all of **my big decisions in this project was the use case of my component. **Thinking about the add-to-cart component, transactional integrity, and immediate consistency of data is of the highest importance, meaning if a user decides to buy, let’s say 10 of the same products, but there are only 9 items available and that is reflected in the database, the user should be notified of the limit.
- With that in mind, I generated 10 million records to emulate production level data sets.

----------**3 big decisions**---------
1. **Deciding which DBMS to go with: ** The very first step I took in the project was deciding which DBMS to go with. After seeding 10 million data records to mimic real life example, I've decided to compare MongoDB with PostgreSQL on reads and writes. MongoDB had a better reads time than PostgreSQL. PostgreSQL outperformed MongoDB at writes. Apparently, there's this trade-off here where MongoDB is faster at reads but PostgreSQL is a lot faster at writes. **To make my decision**, I refered back to my components use case when a user has the ability to sort discussions by given sortations (newest, highest rated, lowest rated), they are browsing far more than they are writing or replying. So I came to a conclusion to prioritize the performance of a read and go with MongoDB.

2. **Horizontally Scalling:** After dockerizing my app using **Docker **and deploying my containers to my **AWS ec2** instance, I stress tested my app using **loader.io**. It was breaking at ~700RPS. At this phase, I identified that a potential bottleneck for me was the fact that I only had one server. It was apparent that one server was handling all the stress of these load tests where thousands of requests are happening. So I decided to explore this by** horizontally scaling** using **Nginx**. I used the default **round-robin load balancing** settings and setup 3 instances. After doing more load tests, an interesting observation was made where implementing Nginx definitely allows more requests to be handled, but there was a diminishing marginal benefit for using Nginx. My RPS decreased by 40%.

3. **Caching:** Identified that my bottleneck now is the database. I explored the option of using **Redis** caching method. I dockerized Redis and deployed to each instance and optimized throughput performance by 300%. 


