import { useEffect, useState } from "react";
import Carousel from "../components/GaleriaSection";
import Section from "../components/BannerSection";
import AdminPanel from "../components/EditModal";

function Home({ isAdmin }) {
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    fetch("http://localhost:3000/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const sections = [
    "Noticias Universidad Mayor de San Simón",
    "Noticias Facultad de Ciencias y Tecnología",
    "Eventos"
  ];

  return (
    <>
      <Carousel posts={posts.slice(0, 3)} />

      {isAdmin && <AdminPanel reload={loadPosts} />}

      {sections.map(section => (
        <Section
          key={section}
          title={section}
          posts={posts.filter(p => p.section === section)}
          isAdmin={isAdmin}
          reload={loadPosts}
        />
      ))}
    </>
  );
}

export default Home;