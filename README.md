#**Crockery Store**
  Description

    ➡️ Crockery store is a E-commerce site which sells plates, dishes, cups, and other similar items.
    ➡️ The site shows available products users can register login and browse the products, users can add products to their       cart, and place the order, from orders page users can veiw their order summary and their order status
    ➡️ The site has role based logging in , admin can log in to veiw the products available in their site, admin can add ,       edit and delete the products , Admin can veiw the orders placed and set the status of each orders (pending,) 
  Credentials

    👉 Role - Admin
        📧Email = "Admin" | 🔐Password = "Admin"
    👉 Role - User
        📧Email = "user" | 🔐Password = "user"

  Technologies used

    👉 '💻-Spring Boot Java' for Back end
    👉 '💻-Angular' for Front end 
    👉 '🗃️-MySql' for Database 

  Screenshots
  
  🔗 ![image](https://github.com/AddwinFernando/Crockery-Store-Angular/assets/145537565/e3ba08e1-851d-41b3-8654-b2cdfb1f6d62)
  🔗 ![image](https://github.com/AddwinFernando/Crockery-Store-Angular/assets/145537565/c306045f-3ee8-46fe-a136-ff12e1219767)
  🔗 ![image](https://github.com/AddwinFernando/Crockery-Store-Angular/assets/145537565/4bf3f105-3f39-4e7d-9a00-f0e9f5b7ee6e)

  Challenges
  
    🔴 Faced Challenges while maping the SQL schema
    🔴 Infinite looping in response JSON
    🔴 Faced Challenges While uploading webp images
    🔴 Faced challenge for @OnetoOne mapping for duplicate datas.
    🔴 Faced challenges in Cascade deletions (deleting a parent record while it is linked to a chiled through foreign key)
  Hardest Errors

    🚩 Internal server error hibernate nested exception - Solved it by reworking on the modal mapping.
    🚩 Internal server error for delete nested entities - Solved it by adding cascade type ALL.
    🚩 Altering the entity and updating it.
    🚩 Handling logic for more than 1 row found for one to one mapping.

  Repository Link
  
    🔗 Front End - [Repo-Link](https://github.com/AddwinFernando/Crockery-Store-Angular)
    🔗 Back End - [Repo-Link](https://github.com/AddwinFernando/Crockery-Store-Spring)

MySQL Schema

👉 ![image](https://github.com/AddwinFernando/Crockery-Store-Angular/assets/145537565/06a3c0ec-0213-4080-9659-5f3eeaf03891)

Demo Video Url
  
  🔗 [Demo Video](https://drive.google.com/file/d/11mDkZNA_1IcbPhapAmAYC6E6AiNE_WE9/view?usp=sharing)
