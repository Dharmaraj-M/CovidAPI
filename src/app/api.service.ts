import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class APIService {
	constructor(private http: HttpClient) { }

	getGlobalData(): Observable<any> {
		const url = "https://api.covid19api.com/summary"
		return this.http.get<any>(url);
	}

	getCountries(): Observable<any> {
		const url = "https://api.covid19api.com/countries"
		return this.http.get<any>(url);
	}

	getCountryData(country: string): Observable<any> {
		const url = "https://api.covid19api.com/live/country/" + country
		return this.http.get<any>(url);
	}

	getDailyData(country: string): Observable<any> {
		const url = "https://api.covid19api.com/total/dayone/country/" + country
		return this.http.get<any>(url);
	}
}
