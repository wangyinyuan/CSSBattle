import type { TargetData, TargetProps } from '@/types/target.d.ts';
// Path: vue-css-battle/src/components/Target.vue
import { getAllBattlesReq } from '@/apis/battle';

let originalTargets: TargetData[];
const targetListHomePanel: TargetProps[] = [];
const targetListDailyPanel: TargetProps[] = [];
const targetListDaily: TargetProps[] = [];

async function setAllTargets() {
  const res = await getAllBattlesReq();
  originalTargets = res.data;
  // 生成 targetListHomePanel 和 targetListDailyPanel
  const length = originalTargets.length;
  for (let i = length - 1; i > length - 7; i--) {
    targetListHomePanel.unshift({
      id: originalTargets[i].id,
      isLocked: false,
      isPlus: i <= length - 3 ? true : false,
      isShowDate: false,
      isToday: i === length - 1,
      highestScore: 'Not Played',
      isTransparent: i !== length - 1,
      month: originalTargets[i].month,
      day: originalTargets[i].day,
      image: originalTargets[i].image,
      colors: originalTargets[i].imageColors
    });

    if (i > length - 3) {
      targetListDailyPanel.unshift({
        id: originalTargets[i].id,
        isLocked: false,
        isPlus: false,
        isShowDate: false,
        isToday: i === length - 1,
        highestScore: 'Not Played',
        isTransparent: i !== length - 1,
        month: originalTargets[i].month,
        day: originalTargets[i].day,
        image: originalTargets[i].image,
        colors: originalTargets[i].imageColors
      });
    }
  }

  targetListDailyPanel.push({
    id: '7',
    isLocked: true,
    isPlus: false,
    isShowDate: false,
    isToday: false,
    highestScore: '',
    isTransparent: true,
    month: 'OCT',
    day: '07'
  });
  targetListHomePanel.push({
    id: '7',
    isLocked: true,
    isPlus: false,
    isShowDate: false,
    isToday: false,
    highestScore: '',
    isTransparent: true,
    month: 'OCT',
    day: '07'
  });

  for (let i = 0; i < length - 2; i++) {
    targetListDaily.push({
      id: originalTargets[i].id,
      isLocked: false,
      isPlus: true,
      isShowDate: true,
      isToday: false,
      highestScore: 'Not Played',
      isTransparent: false,
      month: originalTargets[i].month,
      day: originalTargets[i].day,
      image: originalTargets[i].image,
      colors: originalTargets[i].imageColors
    });
  }

  targetListDaily.reverse();
}

// setAllTargets();

export { setAllTargets, targetListDaily, targetListDailyPanel, targetListHomePanel };

// export const targetListHomePanel: TargetProps[] = [
//   {
//     id: '1',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: false,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: true,
//     month: 'OCT',
//     day: '01',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_nEiqMpK.png?alt=media',
//     colors: ['#8d1c24', '#ec9140']
//   },
//   {
//     id: '2',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: false,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: true,
//     month: 'OCT',
//     day: '02',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_T4L4qry.png?alt=media',
//     colors: ['#5e2d8c', '#f7ed5a']
//   },
//   {
//     id: '3',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: false,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: true,
//     month: 'OCT',
//     day: '03',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_jELVrVb.png?alt=media',
//     colors: ['#e69041', '#221f20']
//   },
//   {
//     id: '4',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: false,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: true,
//     month: 'OCT',
//     day: '04',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_FqPRWOA.png?alt=media',
//     colors: ['#fefae3', '#b17036', '#d4a469']
//   },
//   {
//     id: '5',
//     isLocked: false,
//     isPlus: false,
//     isShowDate: false,
//     isToday: false,
//     highestScore: '190',
//     isTransparent: true,
//     month: 'OCT',
//     day: '05',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_zFP5kGg.png?alt=media',
//     colors: ['#050044', '#ed6a9d']
//   },
//   {
//     id: '6',
//     isLocked: false,
//     isPlus: false,
//     isShowDate: false,
//     isToday: true,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'OCT',
//     day: '06',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_8tWoYsH.png?alt=media',
//     colors: ['#b5d1fb', '#8819f6', '#230259']
//   },
// {
//   id: '7',
//   isLocked: true,
//   isPlus: false,
//   isShowDate: false,
//   isToday: false,
//   highestScore: '',
//   isTransparent: true,
//   month: 'OCT',
//   day: '07'
// }
// ];

// export const targetListDailyPanel: TargetProps[] = [
//   {
//     id: '5',
//     isLocked: false,
//     isPlus: false,
//     isShowDate: false,
//     isToday: false,
//     highestScore: '190',
//     isTransparent: true,
//     month: 'OCT',
//     day: '05',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_zFP5kGg.png?alt=media',
//     colors: ['#050044', '#ed6a9d']
//   },
//   {
//     id: '6',
//     isLocked: false,
//     isPlus: false,
//     isShowDate: false,
//     isToday: true,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'OCT',
//     day: '06',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_8tWoYsH.png?alt=media',
//     colors: ['#b5d1fb', '#8819f6', '#230259']
//   },
//   {
//     id: '7',
//     isLocked: true,
//     isPlus: false,
//     isShowDate: false,
//     isToday: false,
//     highestScore: '',
//     isTransparent: true,
//     month: 'OCT',
//     day: '07'
//   }
// ];

// export const targetListDaily: TargetProps[] = [
//   {
//     id: '1',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'OCT',
//     day: '01',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_nEiqMpK.png?alt=media',
//     colors: ['#8d1c24', '#ec9140']
//   },
//   {
//     id: '2',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'OCT',
//     day: '02',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_T4L4qry.png?alt=media',
//     colors: ['#5e2d8c', '#f7ed5a']
//   },
//   {
//     id: '3',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'OCT',
//     day: '03',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_jELVrVb.png?alt=media',
//     colors: ['#e69041', '#221f20']
//   },
//   {
//     id: '4',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'OCT',
//     day: '04',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_FqPRWOA.png?alt=media',
//     colors: ['#fefae3', '#b17036', '#d4a469']
//   },
//   {
//     id: '8',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'SEP',
//     day: '30',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_IQNBkvc.png?alt=media',
//     colors: ['#e5ddd9', '#3c31a0']
//   },
//   {
//     id: '9',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'SEP',
//     day: '29',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_LegjYRk.png?alt=media',
//     colors: ['#a9c482', '#2d696f']
//   },
//   {
//     id: '10',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'SEP',
//     day: '28',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_0a93JYr.png?alt=media',
//     colors: ['#9cccdb', '#fefae0']
//   },
//   {
//     id: '11',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'SEP',
//     day: '27',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_hYeusEV.png?alt=media',
//     colors: ['#0c0c49', '#da30d4']
//   },
//   {
//     id: '12',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'SEP',
//     day: '26',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_JqCtC5g.png?alt=media',
//     colors: ['#ffffff', '#000000']
//   },
//   {
//     id: '13',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'SEP',
//     day: '25',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_t9YstOt.png?alt=media',
//     colors: ['#a4281f', '#de9473']
//   },
//   {
//     id: '14',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'SEP',
//     day: '24',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_T7arYiU.png?alt=media',
//     colors: ['#fefae0', '#9cccdb']
//   },
//   {
//     id: '15',
//     isLocked: false,
//     isPlus: true,
//     isShowDate: true,
//     isToday: false,
//     highestScore: 'Not Played',
//     isTransparent: false,
//     month: 'SEP',
//     day: '23',
//     image:
//       'https://firebasestorage.googleapis.com/v0/b/cssbattleapp.appspot.com/o/user%2Fummd3POvEDfFyeFvVdOMG3OOrwE2%2Ftargets%2Ftarget_qWAQ4Ra.png?alt=media',
//     colors: ['#f1d272', '#ee7667']
//   }
// ];
