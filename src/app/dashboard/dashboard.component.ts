import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';
import {
	Chart,
	ArcElement,
	LineElement,
	BarElement,
	PointElement,
	BarController,
	BubbleController,
	DoughnutController,
	LineController,
	PieController,
	PolarAreaController,
	RadarController,
	ScatterController,
	CategoryScale,
	LinearScale,
	LogarithmicScale,
	RadialLinearScale,
	TimeScale,
	TimeSeriesScale,
	Filler,
	Legend,
	Title,
	Tooltip
} from 'chart.js';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private api: APIService) { }

	newConfirmed: number;
	newDeaths: number;
	newRecovered: number;

	totalConfirmed: number;
	totalDeaths: number
	totalRecovered: number;

	countries: any;
	selectedCountry: string;
	confirmed: any;
	activeRecoveredDeath: any;

	countryActive: number;
	countryConfirmed: number;
	countryDeaths: number;
	countryRecovered: number;

	countryMonthlyActive: number[] = [];
	countryMonthlyConfirmed: number[] = [];
	countryMonthlyDeaths: number[] = [];
	countryMonthlyRecovered: number[] = [];
	labels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]

	ngOnInit(): void {
		this.getGlobalData();
		this.getCountries();
	}

	getGlobalData() {
		this.api.getGlobalData().subscribe((data) => {
			this.newConfirmed = data.Global.NewConfirmed;
			this.newDeaths = data.Global.NewDeaths;
			this.newRecovered = data.Global.NewRecovered;

			this.totalConfirmed = data.Global.TotalConfirmed;
			this.totalDeaths = data.Global.TotalDeaths;
			this.totalRecovered = data.Global.TotalRecovered;
		})
	}

	getCountries() {
		this.api.getCountries().subscribe((data) => {
			this.countries = data;
			// console.log(this.countries);
		})
	}

	getCountryData() {
		this.api.getCountryData(this.selectedCountry).subscribe((data) => {
			var lastValue = data.length - 1;
			this.countryActive = data[lastValue].Active;
			this.countryConfirmed = data[lastValue].Confirmed;
			this.countryDeaths = data[lastValue].Deaths;
			this.countryRecovered = data[lastValue].Recovered;
		})
	}

	getData() {
		this.getCountryData();
		// console.log(this.selectedCountry);
		this.getDailyData();
		if (this.confirmed || this.activeRecoveredDeath) {
			this.confirmed.destroy();
			this.activeRecoveredDeath.destroy();
		}
		this.createChartForConfirmed();
		this.createChartForActiveRecoveredDeath();
	}

	getDailyData() {
		this.api.getDailyData(this.selectedCountry).subscribe((data) => {
			var index = data.length - 1;
			for (var i = index; i > index - 30; i--) {
				this.countryMonthlyActive.push(data[i].Active);
				this.countryMonthlyConfirmed.push(data[i].Confirmed)
				this.countryMonthlyDeaths.push(data[i].Deaths)
				this.countryMonthlyRecovered.push(data[i].Recovered)
			}
		})
	}

	createChartForActiveRecoveredDeath() {
		Chart.register(
			ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController,
			LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale,
			LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Filler, Legend,
			Title, Tooltip
		);

		this.activeRecoveredDeath = new Chart("activeRecoveredDeath", {
			type: 'line',
			data: {
				labels: this.labels,
				datasets: [
					{
						label: 'Active Cases',
						data: this.countryMonthlyActive,
						fill: false,
						borderColor: 'blue',
						tension: 0.1
					},
					{
						label: 'Deaths',
						data: this.countryMonthlyDeaths,
						fill: false,
						borderColor: 'red',
						tension: 0.1
					},
					{
						label: 'Recovered Cases',
						data: this.countryMonthlyRecovered,
						fill: false,
						borderColor: 'green',
						tension: 0.1
					}
				]
			}
		});
	}
	createChartForConfirmed() {
		Chart.register(
			ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController,
			LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale,
			LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Filler, Legend,
			Title, Tooltip
		);

		this.confirmed = new Chart("confirmed", {
			type: 'line',
			data: {
				labels: this.labels,
				datasets: [
					{
						label: 'Confirmed Cases',
						data: this.countryMonthlyConfirmed,
						fill: false,
						borderColor: 'blueviolet',
						tension: 0.1
					}
				]
			}
		})
	}
}