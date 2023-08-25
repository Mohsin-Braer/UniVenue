<!-- ACTUAL MARKDOWN FOR UNIVENUE -->
<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D 
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
--> 

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">UniVenue</h3>

  <p align="center">
    Creating the ultimate platform tool for universities to lease unused spaces to unlock new realms of collaboration amongst a network of students and alumni.
    <br />
    <a href="https://github.com/Mohsin-Braer/UniVenue/"><strong>Explore the Repo »</strong></a>
    <br />
    <br />
    <a href="www.univenue-app-prod.site">View Demo Here</a>
  </p>
</div>

## About The Project

[![UniVenue Landing Page][landing-page-src]](http://www.univenue-app-prod.site)

UniVenue empowers universities with the ultimate platform tool to enable seamless space leasing opportunities and unlocking new realms of collaboration and revenue generation. Verified students, alumni, and organizations within the network can leverage our platform to lease out unused spaces for meetings, workshops, and even stadium-sized events. Admin accounts associated with each university will have the ability to publish a variety of different spaces (study tables, classrooms, lecture halls, indoor arenas, outdoor stadiums, etc.) for a variety of different occasions (study, meeting, community event, large-scale event, etc.) and for a desired duration. seats and venues are published through the form of tickets. Students and alumni verified through a university ID or university email will have the ability to reserve an available venue at any of the network institutions for a given duration. Once an order is made for that space, an admin account from the given institution must then make the approval to finalize the order and complete the purchase. Confirmation of a reservation will be sent to the user in the form of a ticket. In the case of this demo, as the user, you will be able to sign in and log in to multiple accounts, create tickets, browse through available space catalog, create an order for a ticket, and make a payment to successfully claim a ticket.


This mobile-responsive application embodies an <b>event-driven architecture</b>, meticulously constructed to facilitate seamless interactions. Leveraging <b>Next.js</b> in developing the client service (handling all client related interactions) and <b>Express.js</b> and <b>Bull.js</b> in developing server-side services (authentication, tickets, orders, payments, and expiration services), the application's architecture seamlessly orchestrates the flow of data and interactions. Each distinct service within the <b>kubernetes</b> ecosystem is meticulously designed to communicate through events distributed through technologies such as <b>NATS Streaming Server</b>, allowing for modular development and scalability. Next.js empowers the frontend with its efficient rendering and routing capabilities, while Express.js facilitates the each service's responsiveness and data handling. This combination of technologies enables the application to gracefully adapt to various devices while maintaining a fluid and dynamic user experience.  

<b>GitHub Actions</b> was integrated into this project as an essential automated workflow tool. By leveraging its capabilities, I streamlined UniVenue's development processes, enabling automatic builds, tests, and deployments. This not only bolstered our code quality through consistent testing but also expedited the delivery pipeline, promoting overall project efficiency. <b>DigitalOcean</b> was utilized as the cloud host solution of choice to host out Kubernetes cluster due to its robust (and budget friendly) Kubernetes offering. The platform's straightforward management tools, along with its reliable infrastructure, provided a seamless environment for orchestrating containerized applications while minimizing administrative overhead.

### System Design & Services
[![UniVenue Landing Page][system-design-src]](http://www.univenue-app-prod.site)

### Services
[![UniVenue Landing Page][system-services-src]](http://www.univenue-app-prod.site)

<b>** A custom built npm package ('@crescenttheater/common') was utilized to house all common methods and functionality shared between the different services to avoid repition within the repository **</b>

### Landing Page
[![UniVenue Landing Page][landing-page-src]](http://www.univenue-app-prod.site)
### Marketplace
[![UniVenue Marketplace Page][marketplace-page-src]](http://www.univenue-app-prod.site)
### Ticket Details Page
[![UniVenue Ticket Details Page][ticket-details-src]](http://www.univenue-app-prod.site)
### Order Timer & Payment Page
[![UniVenue Ticket Details Page][order-timer-src]](http://www.univenue-app-prod.site)
### Order History Page
[![UniVenue Order History Page][order-history-src]](http://www.univenue-app-prod.site)
### Sign-in page
[![UniVenue Sign In Page][sign-in-src]](http://www.univenue-app-prod.site)
### Sign-up page
[![UniVenue Sign Up Page][sign-up-src]](http://www.univenue-app-prod.site)


<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Bull.js](https://github.com/OptimalBits/bull)
- [Stripe API](https://stripe.com/docs/api)
- [Ingress-NGINX Controller](https://docs.nginx.com/nginx-ingress-controller/)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Github Actions](https://github.com/features/actions)
- [Digital Ocean](https://www.digitalocean.com/)


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To check out the web application, check it out <a src={www.univenue-app-prod.site}>HERE</a>

To play around with the codebase, lets do the following...  

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Mohsin-Braer/UniVenue.git
   ```
3. Under each service directory, install NPM packages
    ```sh
    cd *service name*
    npm install
    ```
2. Build and push docker images to Docker Hub
   ```sh
    cd *service directory*
    docker build -t *your docker username*/*image name* 
   ```
3. Install neccessary Ingress Kubernetes objects to use Ingress-NGINX Controller
    ```sh
     kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
    ```
4. Update `skaffold.yaml` and infra directory files where necessary

5. Add required secrets `JWT_KEY` and `STRIPE_KEY` to your kubernetes cluster
    ```sh
     kubectl create secret generic jwt-secret --from-literal JWT_KEY= *your jwt key here*
     kubectl create secret generic stripe-secret --from-literal STRIPE_KEY= *your stripe api secret key* 
    ```
6. Run skaffold to run application within cluster
    ```sh
     skaffold dev
    ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[landing-page-src]: /readme-demo-images/landing-page.png
[marketplace-page-src]: /readme-demo-images/ticket-marketplace.png
[system-design-src]: /readme-demo-images/system-design.png
[system-services-src]: /readme-demo-images/system-services.png
[ticket-details-src]: /readme-demo-images/ticket-details.png
[order-timer-src]: /readme-demo-images/order-timer.png
[order-history-src]: /readme-demo-images/order-history.png
[sign-in-src]: /readme-demo-images/sign-in.png
[sign-up-src]: /readme-demo-images/sign-up.png




[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username