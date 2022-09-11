import axios from 'axios';
import {AutoCompleteResponse} from './interfaces';

const BASE_URL = 'https://geoportal.stadt-koeln.de/Finder/Lookup?filter=type:adr&query=';

export async function autoCompleteAddress(query: string): Promise<AutoCompleteResponse> {
    if (Array.isArray(query)) {
        throw new InvalidParameters("query is Array");
    }
    if (typeof query === 'object') {
        throw new InvalidParameters("query is object");
    }
    if (query === undefined) {
        throw new InvalidParameters("query is undefined");
    }

    return axios.get((BASE_URL + query))
        .then((response) => {
            const hnr: any = [];
            let addressData: any = [];
            let zip: any = [];
            let i = 0;
            let temp: any = {};
            for (let loc of response.data.locs) {
                i += 1;
                temp = {};
                temp['name' + loc.fields.plz] = loc.fields.hnr;
                hnr.push(temp);
                if (!zip.includes(loc.fields.plz)) {
                    zip.push(loc.fields.plz);
                    addressData.push({
                        district: loc.fields.stb,
                        zip: loc.fields.plz,
                        city: 'Köln',
                        street: loc.fields.str,
                        numbers: []
                    })
                }
            }
            addressData = addressData.map((item: any) => {
                hnr.map((hnrZip: any) => {
                    Object.keys(hnrZip).forEach(zip => {
                        if (('name' + item.zip) === zip)
                            item.numbers.push(hnrZip[zip])
                    })
                })
                const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
                item.numbers = item.numbers.sort(collator.compare);
                return item;
            })
            return {
                count: addressData.length,
                addresses: addressData,
                time: 0,
            }
        })
        .catch((error) => {
            return error
        });
}

export class InvalidParameters extends Error {
}

