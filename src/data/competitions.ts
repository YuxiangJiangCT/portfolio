import { Competition } from '../types';

export const competitionsData: Competition[] = [
  {
    id: 'huawei-2022',
    title: '2022 Huawei Ascend AI Innovation Competition',
    organizer: 'Huawei',
    award: 'National Finals (Top 30 in China)',
    date: 'Jul 2022 - Dec 2022',
    description: 'Orchestrated the development of TransX Knowledge Graph Network and CTSDG Image Restoration Network on MindSpore, aarch64 CPU, and Huawei NPU, securing two of the 30 national gold awards for highest accuracy.',
    image: `${import.meta.env.BASE_URL}img/huawei.png`,
    projects: [
      {
        id: 'transx',
        name: 'TransX Project',
        description: 'Optimized the TransE model for knowledge graph networking, achieving the top accuracy score (Hit@10) of 0.8674 on Wordnet, setting a contest record.',
        achievement: 'Top accuracy score',
        link: 'https://openi.pcl.ac.cn/AAIC/Fast-TransX'
      },
      {
        id: 'ctsdg',
        name: 'CTSDG Project',
        description: 'Led the development of a dual-stream network that enhanced image restoration, reflected in outstanding PSNR and SSIM scores, showcasing significant improvements in image quality.',
        achievement: 'Outstanding PSNR and SSIM scores',
        link: 'https://openi.pcl.ac.cn/AAIC/CTSDG'
      }
    ]
  }
];