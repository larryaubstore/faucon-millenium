set tabstop=2 shiftwidth=2 expandtab

call plug#begin('~/.vim/plugged')

Plug 'https://github.com/leafgarland/typescript-vim.git'
Plug 'https://github.com/scrooloose/syntastic.git'
Plug 'https://github.com/tpope/vim-unimpaired'
Plug 'https://github.com/scrooloose/nerdcommenter'

call plug#end()

autocmd FileType typescript :set makeprg=tsc



set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0


let g:syntastic_typescript_checkers = ['jshint']
