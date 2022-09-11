import { autoCompleteAddress, InvalidParameters } from './server';
import { Address } from './interfaces';

const QUERY_404 = 'you_not_gonna_find_anything_with_this';

jest.setTimeout(15000);

test('basic structure', async () => {
    expect(typeof autoCompleteAddress).toEqual('function');
    const queryResult = await autoCompleteAddress(QUERY_404);
    expect(queryResult).toBeInstanceOf(Object);
    expect(Number.isInteger(queryResult.count)).toBe(true);
    expect(queryResult.addresses).toBeInstanceOf(Array);
    expect(typeof queryResult.time).toBe('number');
});

test('empty response', async () => {
    const queryResult = await autoCompleteAddress(QUERY_404);
    expect(queryResult.count).toBe(0);
    expect(queryResult.addresses.length).toBe(0);
});

test('find Straße des 17. Juni', async () => {
    const queryResult = await autoCompleteAddress('strasse');
    const addresses = queryResult.addresses;
    expect(addresses).toBeInstanceOf(Array);
    expect(addresses.length).toEqual(1);
    expect(addresses[0]).toMatchObject<Address>({
        district: 'Kalk',
        zip: '51103',
        city: 'Köln',
        street: 'Straße des 17. Juni',
        numbers: ['4', '4a']
    })
});

test('find Ehrenbergstr.', async () => {
    const { addresses } = await autoCompleteAddress('ehrenbe');
    expect(addresses.length).toEqual(1);
    expect(addresses[0]).toMatchObject<Address>({
        district: 'Nippes',
        zip: '50735',
        city: 'Köln',
        street: 'Ehrenbergstr.',
        numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
    })
});

test('find Kasseler', async () => {
    const { addresses, count } = await autoCompleteAddress('kasseler');
    expect(addresses.length).toEqual(2);
    expect(count).toEqual(2);
    // the order doesn't really matter
    expect(addresses[1]).toMatchObject<Address>({
        district: 'Chorweiler',
        zip: '50769',
        city: 'Köln',
        street: 'Kasseler Weg',
        numbers: ['52', '73', '75', '77', '78', '79', '81', '83', '85', '85a', '86', '88', '89', '90', '91', '92', '93', '94', '95', '96', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109']
    })
    expect(addresses[0]).toMatchObject<Address>({
        district: 'Mülheim',
        zip: '51065',
        city: 'Köln',
        street: 'Kasseler Str.',
        numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']
    })
});

test('invalid params', async () => {
    expect.assertions(3);
    // @ts-ignore
    await expect(autoCompleteAddress([])).rejects.toBeInstanceOf(InvalidParameters);
    // @ts-ignore
    await expect(autoCompleteAddress({})).rejects.toBeInstanceOf(InvalidParameters);
    // @ts-ignore
    await expect(autoCompleteAddress()).rejects.toBeInstanceOf(InvalidParameters);
});

test('find Haupt', async () => {
    const { addresses, count } = await autoCompleteAddress('haupt');
    expect(addresses.length).toEqual(3);
    expect(count).toEqual(3);
    expect(addresses).toContainEqual({
        district: 'Lindenthal',
        zip: '50859',
        city: 'Köln',
        street: 'Hauptstr.',
        numbers: ['10', '12', '12a', '12b', '12c', '12d', '12e', '14', '100', '115', '117', '119', '121']
    })
});
