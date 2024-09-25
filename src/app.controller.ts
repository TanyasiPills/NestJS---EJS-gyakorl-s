import { Controller, Get, Param, Render, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('quotes')
  @Render('quotes')
  getQuote() {
    return {
      quotes: this.appService.getQuotes()
    };
  }
  @Get('randomQuote')
  @Render('rand')
  getRanQuote() {
    return {
      quote: this.appService.getRandomQuotes()
    };
  }
  @Get('topAuthors')
  @Render('top')
  getTopAuthor() {
    return {
      quote: this.appService.getTopQuotes()
    };
  }
  @Get('quotes/:id')
  @Render('index')
  getQuoteById(@Param('id') id: string) {
    return {
      quotes: this.appService.getQuoteById(parseInt(id))
    };
  }
  @Get('deleteQuotes/:id')
  @Render('quotes')
  deleteQuoteById(@Param('id') id: string) {
    this.appService.deleteQuoteById(parseInt(id));
    return {
      quotes: this.appService.getQuotes()
    };
  }
  @Get('search')
  @Render('search')
  searchQuote(@Query('searchText') searchText : string = '') {
    return {
      quotes: this.appService.getSearchQuotes(searchText)
    };
  }
  @Get('authorRandomForm')
  @Render('form')
  sup() {
    
  }
  @Get('authorRandom')
  @Render('index')
  searchAuthor(@Query('szerzo') szerzo : string = '') {
    return {
      quotes: this.appService.searchAuthor(szerzo)
    };
  }
  @Get('highlight/:id')
  @Render('index')
  highlight(@Param('id') id: string, @Query('text') text : string = '') {
    return {
      quotes: this.appService.highlightText(id, text)
    };
  }

}
