import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/api';
import "./leading.css";
import './header_lead.css'
import './footer.css'
import Icon from '../assets/icons8-game-50.png'
import IconInsta from '../assets/icons8-instagram-30.png';
import IconYT from '../assets/icons8-youtube-50.png';
import IconFB from '../assets/icons8-facebook-50.png';
import IconGH from '../assets/icons8-github-50.png';


function App_Main() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/data');
        console.log(response);
        setGames(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexLG = currentPage * gamesPerPage;
  const indexFG = indexLG - gamesPerPage;
  const currentGames = games.slice(indexFG, indexLG);

  const paginacao = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleButtonClickJogo = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className='container'>
      
      <nav className="menu">
        <div className='info_header'>
          <img src={Icon} className='icon_menu'/>
          <h2>AppMaster</h2>
        </div>
        <ul className="menu_list">
          <li className="menu_group"><a href="#" class="menu_link">Home</a></li>
          <li className="menu_group"><a href="#" class="menu_link">Games</a></li>
          <li className="menu_group"><a href="#" class="menu_link">Produtos</a></li>
          <li className="menu_group"><a href="#" class="menu_link">Contato</a></li>
        </ul>
      </nav>
      
      <h1>Game List</h1>
      <div className='menu_games'>
      
        {currentGames.map((game) => (
          <div key={game.id} className="card">
            <h2>{game.title}</h2>
            <img src={game.thumbnail} alt={game.title} />
            <h3>{game.developer}</h3>
            <span>{game.short_description}</span>
            <div className='div_card_btns'>
              <button className='btn_form' id='btn_saiba_mais'>Saiba Mais</button>
              <button className='btn_form' id='btn_jogo' onClick={handleButtonClickJogo.bind(null, game.game_url)}>Conheça o jogo</button>


            </div>
          </div>
        ))}
      </div>

      <div className="paginacao">
        {Array.from({ length: Math.ceil(games.length / gamesPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginacao(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      <footer>
        <h3>App Master, a sua proxima aventura começa aqui!</h3>
        <div className='linha_vertical'></div>
        <div className='icons_redes'>
          <img src={IconInsta} alt='icone instagram'/>
          <img src={IconYT} alt='icone YouTube'/>
          <img src={IconFB} alt='icone facebook'/>
          <img src={IconGH} alt='icone GitHub'/>
        </div>
      </footer>

      <div className='icone'></div>
    </div>
  );
}


export default App_Main;


