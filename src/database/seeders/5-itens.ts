import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert(
      'itens',
      [
        { name: 'OLEO 15W40' },
        { name: 'OLEO 5W30' },
        { name: 'OLEO 0W20' },
        { name: 'OLEO DE CAMBIO' },
        { name: 'ÁGUA DESMINERALIZADA' },
        { name: 'ADITIVO' },
        { name: 'CAR 80' },
        { name: 'JUNTA HOMOCINÉTICA' },
        { name: 'COIFA' },
        { name: 'ABRAÇADEIRA' },
        { name: 'TRANSMISSÃO' },
        { name: 'RADIADOR' },
        { name: 'ALTERNADOR' },
        { name: 'BATERIA' },
        { name: 'BICO INJETOR DE COMBUSTÍVEL' },
        { name: 'FILTRO DE ÓLEO' },
        { name: 'FILTRO DE AR' },
        { name: 'COLETOR DE ESCAPE' },
        { name: 'CATALISADOR' },
        { name: 'MOTOR DE PARTIDA' },
        { name: 'EMBREAGEM' },
        { name: 'CORREIA DENTADA' },
        { name: 'BOMBA D\'ÁGUA' },
        { name: 'BOMBA D\'OLEO' },
        { name: 'BOMBA DE DIREÇÃO HIDRÁULICA' },
        { name: 'TURBOCOMPRESSOR' },
        { name: 'CÁRTER DE ÓLEO' },
        { name: 'JOGO DE PISTÃO' },
        { name: 'PIVÔ' },
        { name: 'BANDEJA BALANÇA' },
        { name: 'TERMINAL DE DIREÇÃO' },
        { name: 'PISTÃO' },
        { name: 'VIRABREQUIM' },
        { name: 'EIXO DE COMANDO' },
        { name: 'CABEÇOTE' },
        { name: 'VÁLVULA' },
        { name: 'JOGO DE BIELA' },
        { name: 'BIELA' },
        { name: 'COMPRESSOR DE AR' },
        { name: 'BOMBA DE COMBUSTÍVEL' },
        { name: 'TAMPA DE VÁLVULA' },
        { name: 'CILINDRO MESTRE' },
        { name: 'JOGO DE DISCO DE FREIO' },
        { name: 'JOGO DE PASTILHA DE FREIO' },
        { name: 'ROTOR DO ALTERNADOR' },
        { name: 'EIXO DE TRANSMISSÃO' },
        { name: 'SENSOR DE OXIGÊNIO' },
        { name: 'FILTRO DE COMBUSTÍVEL' },
        { name: 'TUBO DE ESCAPE' },
        { name: 'TAMPA DO RADIADOR' },
        { name: 'VENTOINHA' },
        { name: 'VÁLVULA TERMOSTATICA' },
        { name: 'JOGO DE CABO DE VELAS DE IGNIÇÃO' },
        { name: 'JOGO DE VELAS DE IGNIÇÃO' },
        { name: 'ROLAMENTO DE RODA' },
        { name: 'CUBO DE RODA' },
        { name: 'POLIA' },
        { name: 'COXIM DO MOTOR' },
        { name: 'COXIM DE CAMBIO' },
        { name: 'JOGO DE PARAFUSO CABEÇOTE' },
        { name: 'SENSOR DE ROTAÇÃO' },
        { name: 'BOBINA' },
      ],
      {},
    );
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('itens', {});
  },
};