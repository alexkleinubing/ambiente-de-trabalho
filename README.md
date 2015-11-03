
# Ambiente de trabalho (Ubuntu 14.04)

Segue algumas configurações para se realizar no ambiente de trabalho.   

[TOC]



## Terminal

### Alias

Edite o arquivo `~/.bashrc` 

    alias ..='cd ..'
    alias ...='cd ../../'
    alias ls='ls $LS_OPTIONS'
    alias ll='ls $LS_OPTIONS -alFh'
    alias l='ll'
    alias la='ls $LS_OPTIONS -A'



## Vagrant

Utilizar o modelo do arquivo [`vagrant/.VagrantFile`](vagrant/.Vagrantfile)

 - Box: Ubuntu Trusty x64
 - IP: 192.168.100.101
 - Sincroniza as pastas:
   - `/var/www` (agrega `www-data` como proprietário da pasta) 
   - `/etc/apache2/sites-available`
   - `/etc/apache2/sites-available`
 - Reinicia o apache (para detectar as novas pastas)

`vagrant up` inicia a máquina virtual   
`vagrant halt` desliga a máquina virtual   
`vagrant destroy` remove a máquina virtual   



## Gulp

Modelo de arquivo [`gulp/gulpfile.js`](gulp/gulpfile.js)

 - Base dos arquivos fontes:
   - sass: './_source/sass/'
   - css: './_source/css/'
   - js: './_source/js/'
 - Gera folha de estilo concatenada e minificada em `css/style.css`
 - Gera script concatenado e minificado em `js/scripts.js`
 - Preparado para o Jekyll, build automático
 - Atualiza o navegador automáticamente
 - Com `watch`

Basta rodar `gulp` no diretório em questão.
