let option = {
    Key: "color",
    Items: ["red", "green", "blue"],
};


  
  let options = [];
  
  // luu trong bo nho => da co
  options = [
    {
      Key: "size",
      Items: ["M", "L"],
    },
    // {
    //   Key: "color",
    //   Items: ["red", "green"],
    // },
  ];
  options = [option, ...options];
  
  // luu trong bo nho
  let variants = [
    {
      OptionValues: [
        {
          Option: "size",
          Value: "S",
        },
      ],
    },
    {
      OptionValues: [
        {
          Option: "size",
          Value: "L"
        }
      ],
    },
  ];
  
  // const variants = [
  //   // {
  //   //   OptionValues: [
  //   //     {
  //   //       Option: "size",
  //   //       Value: "S",
  //   //     },
  //   //     {
  //   //       Option: "color",
  //   //       Value: "red",
  //   //     }
  //   //   ],
  //   // },
  //   // {
  //   //   OptionValues: [
  //   //     {
  //   //       Option: "size",
  //   //       Value: "S",
  //   //     },
  //   //     {
  //   //       Option: "color",
  //   //       Value: "green",
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   OptionValues: [
  //   //     {
  //   //       Option: "size",
  //   //       Value: "L",
  //   //     },
  //   //     {
  //   //       Option: "color",
  //   //       Value: "green",
  //   //     },
  //   //   ],
  //   // },
  //   // {
  //   //   OptionValues: [
  //   //     {
  //   //       Option: "size",
  //   //       Value: "L",
  //   //     },
  //   //     {
  //   //       Option: "color",
  //   //       Value: "red",
  //   //     },
  //   //   ],
  //   // },
  // ];
  
  const newVariants = [];
  for (const item of option.Items) {
    if (options.length == 1) {
      const optionValue = {
        OptionValues: [
          {
            Option: option.Key,
            Value: item,
          },
        ],
      };
      newVariants.push(optionValue);
    } else {
      for (const variant of variants) {
        const newOptionValue = {
          Option: option.Key,
          Value: item,
        };
        newVariants.push({
          OptionValues: [newOptionValue, ...variant.OptionValues],
        });
      }
    }
  }
  variants = newVariants;
  // console.log(newVariants);
  