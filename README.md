# Lecture Comics
Final proyect web - api with node, express and mongo, 3 collections, can authenticate users via JWT, create categories, comies by categories and effectuate CRUD operations

Manuel Alejandro Escobar Mira - Group 2

<br>
<h2>Dependencias</h2>
<ul>
    <li>Bcrypt</li>
    <li>dotenv</li>
    <li>express</li>
    <li>express-validator</li>
    <li>jsonwebtoken</li>
    <li>mongoose</li>
</ul>

<h2>Create User</h2>
<p>The JWT of valid users are valid for 1 hour</p>
<br>
<img src="https://i.imgur.com/O6g39YR.png" alt="create-user" border="0">
<p>We can create an new user with name, email and password.</p>
<img src="https://i.imgur.com/H62Espc.png" alt="create-user" border="0">
<p>You can't register twice with the same email.</p>
<br>

<h2>Validate User</h2>
<h3>All the passwords are encrypted and validated with the bcryptjs module</h3>
<br>
<img src="https://i.imgur.com/YpiU93F.png" alt="no-email" border="0">
<p>Api can validate if the email don't figure in the users</p>
<img src="https://i.imgur.com/Ser3emd.png" alt="no-password" border="0">
<p>Api can validate if the password is the one with the user register </p>
<img src="https://i.imgur.com/EUqS3Qo.png" alt="auth" border="0">
<p>When you put correctly your auth data a JWT is generated from the validation in the crud opperations.</p>
<br>

<h2>Categories</h2>
<br>
<img src="https://i.imgur.com/IDBDEvw.png" alt="create-category" border="0">
<p>When you're logged, you can create your own's categories with a required name</p>
<img src="https://i.imgur.com/2wPAm7Y.png" alt="get-category" border="0">
<p>We can list the categories by authenticated user</p>
<img src="https://i.imgur.com/k07AxOQ.png" alt="edit-category" border="0">
<p>You can edit the category name</p>
<br>

<h2>Comics</h2>
<br>
<img src="https://i.imgur.com/wLtnalB.png" alt="create-comic" border="0">
<p>When you're logged, you can create your own's comics into a category, with a required name</p>
<img src="https://i.imgur.com/4YXRDTb.png" alt="get-comic" border="0">
<p>We can list the comics by categories</p>
<img src="https://i.imgur.com/ViA86xa.png" alt="edit-comic" border="0">
<p>You can edit the comic's name and his read status</p>
<img src="https://i.imgur.com/jPjlYIE.png" alt="delete-comic" border="0">
<p>You can delete the comics by id</p>
<br>