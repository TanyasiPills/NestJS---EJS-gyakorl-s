import { Injectable } from '@nestjs/common';
import { quotes } from './quotes';
import { M } from 'vite/dist/node/types.d-aGj9QkWt';

@Injectable()
export class AppService {
  getQuotes() {
    return quotes.quotes;
  }
  getRandomQuotes() {
    let id = Math.floor(Math.random() * (quotes.quotes.length)) + 0;
    return quotes.quotes[id];
  }
  getTopQuotes(){
    let quotesList = quotes.quotes;
    const frequencyMap = new Map();

    quotesList.forEach(e => {
      let count = frequencyMap.get(e.author) || 0;
      frequencyMap.set(e.author,count+1);
    });

    const sortedItems = Array.from(frequencyMap.entries()).sort((a, b) => b[1] - a[1]);

    return sortedItems;
  }
  getQuoteById(id : number){
    return  quotes.quotes.find(e => e.id == id-1);
  }
  deleteQuoteById(id : number){
    quotes.quotes = quotes.quotes.filter(e => e.id !== id);
  }
  getSearchQuotes(text : string){
    return quotes.quotes.filter(e => e.quote.toLowerCase().includes(text));
  }
  searchAuthor(author : string){
    let quoteList = quotes.quotes.filter(e => e.author.toLowerCase().includes(author.toLowerCase()));
    console.log(quoteList);
    if(quoteList.length == 0) return {quote: "nincs idézete a szerzőnek", author: author};
    let id = Math.floor(Math.random() * (quoteList.length-1));
    return quoteList[id];
  }
  highlightText(id : string, text : string){
    let quote = quotes.quotes.find(e => e.id == parseInt(id));
    quote.quote = quote.quote.replace(text, "<b>"+text+"</b>");
    return quote
  }
}
