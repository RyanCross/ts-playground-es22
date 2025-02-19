function findInterestingSubstrings(title: string, age : number, gpa : number) {
    if (title.length === 0) {
        return [""]
    }

    const interestingSubstr = []

    // start with a smallest substring, and then lengthen it till we reach length of string
    // move start ptr of substring
    let start = 0;
    for(let end = start; end <= title.length - 1; end++) {

        // extracting the substring to examine
            // handle end of title length
            let substr
            if (end === title.length - 1) {
                substr = title.slice(start)
                start = start + 1
                end = start
            }
            else {
                substr = title.slice(start, end + 1)
            }

            console.log(substr)

        // determine the number of vowels and consonants
        let V = 0;
        let C = 0;

        let vowels = "aeiou"
        for (let char of substr) {
            if (vowels.includes(char)) {
                V++
            }
            else {
                C++
            }
        }

        console.log("V: " + V)
        console.log("C: " + C)

        // add to interesting substrings if indeed interesting
        if (substr.length === (age * V + gpa * C)) {
            interestingSubstr.push(substr)
        } 
    
    }
    return interestingSubstr
}

console.log(findInterestingSubstrings("banana", 1, 1))