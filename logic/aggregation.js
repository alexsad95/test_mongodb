export default [
  {
    $lookup: {
      from: 'countries',
      localField: 'country',
      foreignField: 'country',
      as: 'overAllValue',
    },
  }, {
    $project: {
      students: '$students',
      location: '$location',
      country: '$country',
      overAllValue: {
        $arrayElemAt: [
          '$overAllValue.overallStudents', 0,
        ],
      },
    },
  }, {
    $project: {
      location: '$location',
      country: '$country',
      students: '$students',
      overAllValue: '$overAllValue',
      allDiffs: {
        $map: {
          input: '$students',
          as: 'student',
          in: {
            year: '$$student.year',
            number: {
              $abs: {
                $subtract: [
                  '$$student.number', '$overAllValue',
                ],
              },
            },
          },
        },
      },
    },
  }, {
    $group: {
      _id: '$country',
      count: {
        $sum: 1,
      },
      longitude: {
        $push: {
          $arrayElemAt: [
            '$location.ll', 0,
          ],
        },
      },
      latitude: {
        $push: {
          $arrayElemAt: [
            '$location.ll', 1,
          ],
        },
      },
      allDiffs: {
        $first: '$allDiffs',
      },
    },
  },
  {
    $merge: { into: 'results' },
  },
];