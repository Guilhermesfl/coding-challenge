class Helper {
  mergeAbsencesAndMember(absences, members) {
    absences.map((absence) => {
      const abs = absence;
      for (let i = 0; i < members.length; i++) {
        if (abs.userId === members[i].userId) {
          abs.userName = members[i].name;
          return abs;
        }
      }
    });
    return absences;
  }
}

export default new Helper();
