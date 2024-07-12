# Australian Company Number (ACN) EXERCISE

## Exercise

Create AngularJs and Angular (latest angular) apps to validate Australian Company Number (ACN). The ACN is a nine digit number with the last digit being a check digit calculated using a modified modulus 10 calculation.

ASIC (Australian Securities and Investments Commission) has adopted a convention of always printing and displaying the ACN in the format nnn nnn nnn, that is three blocks of three characters separated by a blank. This is to assist readability and the inserted blanks do not form part of the ACN.

- For example, to validate the check digit for ACN 004 085 616: apply weighting to digits 1 to 8

---

| Digits          | 0   | 0   | 4   | 0   | 8   | 5   | 6   | 1   |
| --------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| Weight          | 8   | 7   | 6   | 5   | 4   | 3   | 2   | 1   |
| Digits x Weight | 0   | 0   | 24  | 0   | 32  | 15  | 12  | 1   |

---

- sum the products 0 + 0 + 24 + 0 + 32 + 15 + 12 + 1 = 84

- divide by 10 to obtain remainder 84 / 10 = 8 remainder 4

- complement the remainder to 10 10 - 4 = 6

    Note: if complement = 10, set to 0.

- Thus calculated check digit (6) equals actual check digit (6) so ACN 004 085 616 is VALID.

## Examples of valid ACNs include:

| 000 000 019 | 000 250 000 | 000 500 005 | 000 750 005 |
| ----------- | ----------- | ----------- | ----------- |
| 001 000 004 | 001 250 004 | 001 500 009 | 001 749 999 |
| 001 999 999 | 002 249 998 | 002 499 998 | 002 749 993 |
| 002 999 993 | 003 249 992 | 003 499 992 | 003 749 988 |
| 003 999 988 | 004 249 981 | 005 499 981 | 005 749 986 |

## Acceptance Criteria

- User able to input ACN using nnn nnn nnn format or nnnnnnnnn (without blank space)
- The app able to validate the ACN correctly
- Unit tests are present
- Utilise directive in the AngularJs App