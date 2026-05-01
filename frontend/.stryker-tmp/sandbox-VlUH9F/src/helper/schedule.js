// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { isEmpty } from 'lodash';
const hoverLineClassName = stryMutAct_9fa48("13") ? "" : (stryCov_9fa48("13"), 'hover-line');
export const divideLessonsByOneHourLesson = (items, lessons) => {
  if (stryMutAct_9fa48("14")) {
    {}
  } else {
    stryCov_9fa48("14");
    const lessonItem = stryMutAct_9fa48("15") ? ["Stryker was here"] : (stryCov_9fa48("15"), []);
    lessons.forEach(lesson => {
      if (stryMutAct_9fa48("16")) {
        {}
      } else {
        stryCov_9fa48("16");
        let filteredLesson = stryMutAct_9fa48("17") ? ["Stryker was here"] : (stryCov_9fa48("17"), []);
        const modifiedLesson = lesson;
        const {
          hours
        } = modifiedLesson;
        if (stryMutAct_9fa48("20") ? false : stryMutAct_9fa48("19") ? true : stryMutAct_9fa48("18") ? isEmpty(items) : (stryCov_9fa48("18", "19", "20"), !isEmpty(items))) {
          if (stryMutAct_9fa48("21")) {
            {}
          } else {
            stryCov_9fa48("21");
            filteredLesson = stryMutAct_9fa48("22") ? items : (stryCov_9fa48("22"), items.filter(stryMutAct_9fa48("23") ? () => undefined : (stryCov_9fa48("23"), item => stryMutAct_9fa48("26") ? item.lesson.id !== lesson.id : stryMutAct_9fa48("25") ? false : stryMutAct_9fa48("24") ? true : (stryCov_9fa48("24", "25", "26"), item.lesson.id === lesson.id))));
          }
        }
        for (let i = 0; stryMutAct_9fa48("29") ? i >= hours - filteredLesson.length : stryMutAct_9fa48("28") ? i <= hours - filteredLesson.length : stryMutAct_9fa48("27") ? false : (stryCov_9fa48("27", "28", "29"), i < (stryMutAct_9fa48("30") ? hours + filteredLesson.length : (stryCov_9fa48("30"), hours - filteredLesson.length))); stryMutAct_9fa48("31") ? i -= 1 : (stryCov_9fa48("31"), i += 1)) {
          if (stryMutAct_9fa48("32")) {
            {}
          } else {
            stryCov_9fa48("32");
            lessonItem.push(modifiedLesson);
          }
        }
      }
    });
    return lessonItem;
  }
};
export const addClassDayBoard = (dayName, classId) => {
  if (stryMutAct_9fa48("33")) {
    {}
  } else {
    stryCov_9fa48("33");
    const dayClassWeek = document.querySelectorAll(stryMutAct_9fa48("34") ? `` : (stryCov_9fa48("34"), `.${dayName}-${classId}`));
    const dayClass = document.querySelector(stryMutAct_9fa48("35") ? `` : (stryCov_9fa48("35"), `#${dayName}-${classId}`));
    dayClass.classList.add(stryMutAct_9fa48("36") ? "" : (stryCov_9fa48("36"), 'focus-class'));
    dayClassWeek[0].classList.add(hoverLineClassName);
    dayClassWeek[1].classList.add(hoverLineClassName);
  }
};
export const removeClassDayBoard = (dayName, classId) => {
  if (stryMutAct_9fa48("37")) {
    {}
  } else {
    stryCov_9fa48("37");
    const dayClassWeek = document.querySelectorAll(stryMutAct_9fa48("38") ? `` : (stryCov_9fa48("38"), `.${dayName}-${classId}`));
    const dayClass = document.querySelector(stryMutAct_9fa48("39") ? `` : (stryCov_9fa48("39"), `#${dayName}-${classId}`));
    dayClass.classList.remove(stryMutAct_9fa48("40") ? "" : (stryCov_9fa48("40"), 'focus-class'));
    dayClassWeek[0].classList.remove(hoverLineClassName);
    dayClassWeek[1].classList.remove(hoverLineClassName);
  }
};
export const getColorByFullness = (array = stryMutAct_9fa48("41") ? ["Stryker was here"] : (stryCov_9fa48("41"), [])) => {
  if (stryMutAct_9fa48("42")) {
    {}
  } else {
    stryCov_9fa48("42");
    let color = isEmpty(array) ? stryMutAct_9fa48("43") ? "" : (stryCov_9fa48("43"), 'available') : stryMutAct_9fa48("44") ? "" : (stryCov_9fa48("44"), 'allow');
    let prevLesson = stryMutAct_9fa48("45") ? {} : (stryCov_9fa48("45"), {
      teacherName: stryMutAct_9fa48("46") ? array[0].teacher_for_site : (stryCov_9fa48("46"), array[0]?.teacher_for_site),
      lessonName: stryMutAct_9fa48("47") ? array[0].subject_for_site : (stryCov_9fa48("47"), array[0]?.subject_for_site)
    });
    array.forEach(lesson => {
      if (stryMutAct_9fa48("48")) {
        {}
      } else {
        stryCov_9fa48("48");
        const isTeacherNameTheSame = stryMutAct_9fa48("51") ? lesson.teacher_for_site !== prevLesson.teacherName : stryMutAct_9fa48("50") ? false : stryMutAct_9fa48("49") ? true : (stryCov_9fa48("49", "50", "51"), lesson.teacher_for_site === prevLesson.teacherName);
        const isLessonNotTheSame = stryMutAct_9fa48("54") ? lesson.subject_for_site === prevLesson.lessonName : stryMutAct_9fa48("53") ? false : stryMutAct_9fa48("52") ? true : (stryCov_9fa48("52", "53", "54"), lesson.subject_for_site !== prevLesson.lessonName);
        if (stryMutAct_9fa48("57") ? isLessonNotTheSame || isTeacherNameTheSame : stryMutAct_9fa48("56") ? false : stryMutAct_9fa48("55") ? true : (stryCov_9fa48("55", "56", "57"), isLessonNotTheSame && isTeacherNameTheSame)) {
          if (stryMutAct_9fa48("58")) {
            {}
          } else {
            stryCov_9fa48("58");
            color = stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), 'possible');
          }
        }
        if (stryMutAct_9fa48("62") ? false : stryMutAct_9fa48("61") ? true : stryMutAct_9fa48("60") ? isTeacherNameTheSame : (stryCov_9fa48("60", "61", "62"), !isTeacherNameTheSame)) {
          if (stryMutAct_9fa48("63")) {
            {}
          } else {
            stryCov_9fa48("63");
            color = stryMutAct_9fa48("64") ? "" : (stryCov_9fa48("64"), 'not-allow');
          }
        }
        prevLesson = stryMutAct_9fa48("65") ? {} : (stryCov_9fa48("65"), {
          teacherName: lesson.teacher_for_site,
          lessonName: lesson.subject_for_site
        });
      }
    });
    return color;
  }
};