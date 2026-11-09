// Array de objetos: cada frase possui um texto e sua autoria.
const frases = [
  { texto: 'Grandes jornadas começam com pequenos passos.', autor: 'Sabedoria popular' },
  { texto: 'A melhor maneira de prever o futuro é criá-lo.', autor: 'Peter Drucker' },
  { texto: 'Feito é melhor que perfeito.', autor: 'Sheryl Sandberg' },
  { texto: 'A persistência realiza o impossível.', autor: 'Provérbio chinês' },
  { texto: 'Aprender é a única coisa de que a mente nunca se cansa.', autor: 'Leonardo da Vinci' },
  { texto: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.', autor: 'Robert Collier' },
  { texto: 'Não tenha medo de recomeçar. Desta vez você não começa do zero, começa da experiência.', autor: 'Autor desconhecido' },
  { texto: 'A criatividade é a inteligência se divertindo.', autor: 'Frase atribuída a Albert Einstein' },
  { texto: 'A diferença entre o possível e o impossível está na determinação.', autor: 'Tommy Lasorda' },
  { texto: 'É fazendo que se aprende a fazer aquilo que se deve aprender.', autor: 'Aristóteles' },
  { texto: 'Pequenos progressos todos os dias somam grandes resultados.', autor: 'Autor desconhecido' },
  { texto: 'O segredo de avançar é começar.', autor: 'Mark Twain' }
];

const quoteText = document.querySelector('#quoteText');
const quoteAuthor = document.querySelector('#quoteAuthor');
const quoteCount = document.querySelector('#quoteCount');
const message = document.querySelector('#message');
let fraseAtual = 0;
let ultimoIndice = 0;
let sorteios = 1;

function sortearFrase() {
  let novoIndice;
  // Evita repetir a mesma frase em dois sorteios seguidos.
  do {
    novoIndice = Math.floor(Math.random() * frases.length);
  } while (frases.length > 1 && novoIndice === ultimoIndice);

  ultimoIndice = novoIndice;
  fraseAtual = novoIndice;
  sorteios += 1;
  quoteText.textContent = frases[fraseAtual].texto;
  quoteAuthor.textContent = `— ${frases[fraseAtual].autor}`;
  quoteCount.textContent = `SORTEIO ${String(sorteios).padStart(2, '0')}`;
  message.textContent = 'Uma nova ideia para levar com você. ✦';
}

async function copiarFrase() {
  const texto = `“${frases[fraseAtual].texto}” — ${frases[fraseAtual].autor}`;
  try {
    await navigator.clipboard.writeText(texto);
    message.textContent = 'Frase copiada para a área de transferência!';
  } catch (error) {
    // Fallback para contextos em que a Clipboard API não está disponível.
    const campo = document.createElement('textarea');
    campo.value = texto;
    campo.setAttribute('readonly', '');
    campo.style.position = 'absolute';
    campo.style.left = '-9999px';
    document.body.append(campo);
    campo.select();
    const copiou = document.execCommand('copy');
    campo.remove();
    message.textContent = copiou ? 'Frase copiada!' : 'Não foi possível copiar automaticamente.';
  }
}

document.querySelector('#newQuoteButton').addEventListener('click', sortearFrase);
document.querySelector('#copyButton').addEventListener('click', copiarFrase);
