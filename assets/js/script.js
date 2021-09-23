class Person {
    constructor() {
        this.name = '';
        this.lastName = '';
        this.registration = new Registration();
        this.cpf = new Cpf();
    }

    set setName(value) {
        if (value.length < 1) return;
        // console.log(value < 5);
        this.name = value;
    }

    get getName() {
        return this.name;
    }

    set setLastName(value) {
        if (value.length < 1) return;
        this.lastName = value;
    }

    get getLastName() {
        return this.lastName;
    }

    get fullName() {
        return `${this.name} ${this.lastName}`;
    }
}

class Registration {
    constructor() {
        this.user = '';
        this.password = '';
    }

    set setUser(value) {
        if (value.length < 3 || value.legnth > 12)
            return { status: false, property: 'user' };
        this.user = value;
        return { status: true };
    }

    set setPassword(value) {
        if (value.length < 6 || value.length > 12)
            return { status: true, property: 'password' };
        this.password = value;
    }

    get getPassword() {
        return this.password;
    }

    get getUser() {
        return this.user;
    }
}

class Cpf {
    constructor() {
        this.cpf = '';
    }

    set setCpf(value) {
        if (!Cpf.verificationNumbers(value)) {
            return false;
        }
        this.cpf = value;
    }

    get getCpf() {
        return this.cpf;
    }

    static cpfGenerator() {
        let newCpf;
        //while para verificar se o cpg gerado não é uma sequência
        while (isNaN(newCpf)) {
            let rawCpf = [];
            for (let i = 0; i <= 9; i++) {
                rawCpf.push(Math.floor(Math.random() * 10));
            }

            newCpf = verificationNumbers(rawCpf.join(''));
        }
        return newCpf;
    }

    static verificationNumbers(string) {
        let rawCpf = String(string).replace(/\D+/g, '').slice(0, 9).split('');
        const itsSequence = this.itsASequence(rawCpf.join(''));

        if (itsSequence) {
            return false;
        }

        let count = 10;

        let total = rawCpf.reduce((sum, item) => {
            sum += count * item;
            count--;
            return sum;
        }, 0);

        let digit = 11 - (total % 11) > 9 ? 0 : 11 - (total % 11);

        rawCpf.push(digit);

        count = 11;

        total = rawCpf.reduce((sum, item) => {
            sum += item * count;
            count--;
            return sum;
        }, 0);

        digit = 11 - (total % 11) > 9 ? 0 : 11 - (total % 11);
        rawCpf.push(digit);

        return rawCpf.join('') == string.replace(/\D+/g, '');
    }

    //verificar se o cpf é uma sequencia de numeros ex: 11111111111, 22222222222...
    static itsASequence(string) {
        return String(string).charAt(0).repeat(string.length) == string;
    }
}

document.getElementById('btn-send').addEventListener('click', () => {
    clearResults();

    const person = new Person();

    let pass = true;
    //validação do nome
    person.setName = document.getElementById('name').value;

    if (!person.getName) {
        writeResultInScreen({
            property: 'name',
            status: false,
        });

        pass = false;
    }

    //validação do sobrenome
    person.setLastName = document.getElementById('lastname').value;

    if (!person.getLastName) {
        writeResultInScreen({
            property: 'lastname',
            status: false,
        });
        pass = false;
    }

    // validação do usuário
    person.registration.setUser = document.getElementById('user').value;

    if (!person.registration.getUser) {
        writeResultInScreen({
            property: 'user',
            status: person.registration.getUser,
        });
        pass = false;
    }

    //validação cpf
    person.cpf.setCpf = document.getElementById('cpf').value;
    if (!person.cpf.getCpf) {
        writeResultInScreen({ property: 'cpf', status: false });
        pass = false;
    }

    //validação da senha
    person.registration.setPassword = document.getElementById('password').value;
    if (!person.registration.getPassword) {
        console.log('person.registration.getPassword');
        writeResultInScreen({
            property: 'password',
            status: false,
        });
        pass = false;
    }

    //validação senha 2
    person.registration.setPassword = document.getElementById('password').value;

    if (
        document.getElementById('verifyPassword').value !==
            person.registration.getPassword ||
        !person.registration.getPassword
    ) {
        writeResultInScreen({ property: 'password2', status: false });
        pass = false;
    } else {
        person.registration.setPassword =
            document.getElementById('password').value;
    }

    if (pass) {
        writeResultInScreen({ property: 'result', status: true });
    }
});

function clearResult(element) {}

function writeResultInScreen(element) {
    const div = document.getElementById(`div-${element.property}`);
    const span = document.createElement('span');
    let pass = 'rejected';
    let text = 'Inválido';

    if (element.property === 'result' && element.status) {
        pass = 'accept';
        text = 'Formulário valido';
    }

    span.classList.add(pass);
    span.innerText = text;

    div.appendChild(span);
}

function clearResults() {
    for (let span of document.querySelectorAll('.accept, .rejected')) {
        span.remove();
    }
}
